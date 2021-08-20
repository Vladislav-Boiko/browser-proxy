import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';
import { getTotalResponse, tryStringifyRequestBody } from '../../common/utils';

// ms
const WAIT_OVERRIDES_LOADED_DELAY = 5;
const MAX_WAITING_STEPS = 10;

class Overrides {
  overrides = {};
  hasLoaded = false;

  async startListening() {
    messaging.emit(EVENTS.REQUEST_OVERRIDES_UPDATE, {});
    messaging.subscribe(EVENTS.OVERRIDES_UPDATED, (overrides) => {
      this.hasLoaded = true;
      this.overrides = overrides;
    });
  }

  // Traversing the overrides tree with any depth.
  recursivelySearchOverrides(xhrData, parent, variables = []) {
    if (parent.nodes && parent.nodes.length && parent.isOn !== false) {
      const found = this.findOverrideAmong(
        xhrData,
        parent.nodes.filter(({ nodes }) => !nodes),
        [...variables, ...(parent.variables ? parent.variables : [])],
      );
      if (found) {
        return found;
      }
      for (let node of parent.nodes) {
        if (node.nodes && node.nodes.length) {
          const foundInSubnodes = this.recursivelySearchOverrides(
            xhrData,
            node,
            [
              ...variables,
              ...(parent.variables ? parent.variables : []),
              ...(node.variables ? node.variables : []),
            ],
          );
          if (foundInSubnodes) {
            return foundInSubnodes;
          }
        }
      }
    }
    return null;
  }

  async findOverride(xhrData) {
    // this.overrides is a domain node.
    if (this.overrides) {
      let step = 1;
      while (!this.hasLoaded && step < MAX_WAITING_STEPS) {
        step++;
        await new Promise((resolve) => {
          messaging.emit(EVENTS.REQUEST_OVERRIDES_UPDATE, {});
          setTimeout(resolve, WAIT_OVERRIDES_LOADED_DELAY);
        });
      }
      return this.recursivelySearchOverrides(xhrData, this.overrides);
    }
    return null;
  }

  findOverrideSync(xhrData) {
    if (this.overrides) {
      return this.recursivelySearchOverrides(xhrData, this.overrides);
    }
    return null;
  }

  findOverrideAmong(xhrData, overrides, variables = []) {
    let matchedVariables = null;
    let foundOverride = overrides.find((override) => {
      if (override.isOn !== false) {
        const {
          isMatch,
          variableMatches,
        } = this.compareXhrWithOverride(xhrData, override, [
          ...variables,
          ...(override.variables ? override.variables : []).filter(
            ({ name }) => !!name,
          ),
        ]);
        if (isMatch) {
          matchedVariables = variableMatches;
        }
        return isMatch;
      }
      return false;
    });
    if (foundOverride) {
      return this.replaceVariablesInOverride(foundOverride, matchedVariables);
    }
    return foundOverride;
  }

  replaceVariablesInOverride(override, matchedVariables) {
    const overrideCopy = Object.assign({}, override);
    if (matchedVariables?.length) {
      if (overrideCopy?.responseBody) {
        overrideCopy.responseBody = overrideCopy.responseBody.map(
          ({ value, ...other }) => ({
            value: this.replaceVariablesInAString(value, matchedVariables),
            ...other,
          }),
        );
      }
      if (overrideCopy?.responseHeaders) {
        overrideCopy.responseHeaders = overrideCopy.responseHeaders.map(
          ({ name, value, ...other }) => ({
            name: this.replaceVariablesInAString(name, matchedVariables),
            value: this.replaceVariablesInAString(value, matchedVariables),
            ...other,
          }),
        );
      }
    }
    return overrideCopy;
  }

  // creates from a string an ordered list of parts and variables
  inflateWithVariable(text, variable) {
    if (!text) {
      return [];
    }
    if (!variable.name) {
      return [text];
    }
    const splitted = text.split(variable.name);
    return splitted.reduce((acc, value, index) => {
      let result = [...acc];
      result.push(value);
      if (index !== splitted.length - 1) {
        result.push(variable);
      }
      return result;
    }, []);
  }

  replaceVariablesInAString(text, variables) {
    let result = text;
    if (text) {
      for (let variable of variables) {
        if (variable.match) {
          result = text.replace(variable.name, variable.match);
        }
      }
    }
    return result;
  }

  compareWithInflatedString(stringWithoutVariables, inflatedString) {
    let processedString = stringWithoutVariables;
    let matches = [];
    let variableMatches = [];
    let isMatch = true;
    for (let part of inflatedString) {
      if (typeof part === 'string') {
        const toMatch = processedString.slice(0, part.length);
        isMatch = toMatch === part;
        matches.push({
          request: toMatch,
          override: part,
          isMatch,
        });
        processedString = processedString.slice(part.length);
      } else if (typeof part === 'object') {
        try {
          const regexp = new RegExp(part.value);
          const result = regexp.exec(processedString);
          isMatch = result && result.index === 0;
          matches.push({
            request: isMatch ? result[0] : '',
            override: part.name,
            isMatch,
            variable: part.value,
          });
          processedString = isMatch
            ? processedString.slice(result[0].length)
            : processedString;
          variableMatches.push({ ...part, match: result[0] });
        } catch (e) {
          isMatch = false;
          matches.push({
            request: processedString,
            override: part?.name,
            isMatch: false,
            variable: part?.value,
          });
        }
      }
    }
    if (processedString) {
      isMatch = false;
      matches.push({ isMatch: false, request: processedString, override: '' });
    }
    return { isMatch, variableMatches, matches };
  }

  matchStringWithVariables(
    stringWithoutVariables = '',
    stringWithVariables = '',
    variables = [],
  ) {
    let matches = [];
    if (!stringWithoutVariables && !stringWithVariables) {
      matches = [
        {
          request: stringWithoutVariables,
          override: stringWithVariables,
          isMatch: true,
        },
      ];
      return { isMatch: true, matches };
    }
    let inflated = [stringWithVariables];
    for (let variable of variables) {
      inflated = inflated.reduce(
        (acc, part) => [
          ...acc,
          ...(typeof part === 'string'
            ? this.inflateWithVariable(part, variable)
            : [part]),
        ],
        [],
      );
    }
    return this.compareWithInflatedString(stringWithoutVariables, inflated);
  }

  compareUrlMatch(xhrData, override, variables = []) {
    const result = this.matchStringWithVariables(
      xhrData.url,
      override.url,
      variables,
    );
    return result;
  }

  compareMethodMatch(xhrData, override, variables = []) {
    const overrideMethod = (
      override.method ??
      override.type ??
      'GET'
    ).toUpperCase();
    const xhrMethod = (xhrData.method || 'GET').toUpperCase();
    const result = this.matchStringWithVariables(
      xhrMethod,
      overrideMethod,
      variables,
    );
    return result;
  }

  getHeadersDiff(xhrHeaders, ovrrideHeaders, variables) {
    let variableMatches = [];
    const been = [];
    let matches = [];
    xhrHeaders.forEach(({ name, value }) => {
      been.push(name);
      const overrideHeader = ovrrideHeaders.find((header) => {
        const headerNameMatch = this.matchStringWithVariables(
          name,
          header.name,
          variables,
        );
        if (headerNameMatch.isMatch) {
          matches = matches.concat(headerNameMatch.matches);
          variableMatches = variableMatches.concat(
            ...(headerNameMatch.variableMatches || []),
          );
          return true;
        }
        return false;
      });
      if (!overrideHeader) {
        matches.push({ isMatch: false, request: name, override: '' });
        matches.push({ isMatch: false, request: value, override: '' });
      } else {
        const valueMatch = this.matchStringWithVariables(
          value,
          overrideHeader.value,
          variables,
        );
        variableMatches = variableMatches.concat(
          ...(valueMatch.variableMatches || []),
        );
        matches = matches.concat(valueMatch.matches);
      }
    });
    ovrrideHeaders.forEach(({ name, value }) => {
      if (been.find((beenName) => beenName === name)) {
        return;
      }
      been.push(name);
      const xhrHeader = xhrHeaders.find((header) => {
        const headerNameMatch = this.matchStringWithVariables(
          name,
          header.name,
          variables,
        );
        if (headerNameMatch.isMatch) {
          matches = matches.concat(headerNameMatch.matches);
          variableMatches = variableMatches.concat(
            ...(headerNameMatch.variableMatches || []),
          );
          return true;
        }
        return false;
      });
      if (!xhrHeader) {
        matches.push({ isMatch: false, request: name, override: '' });
        matches.push({ isMatch: false, request: value, override: '' });
      } else {
        const valueMatch = this.matchStringWithVariables(
          value,
          xhrHeader.value,
          variables,
        );
        variableMatches = variableMatches.concat(
          ...(valueMatch.variableMatches || []),
        );
        matches = matches.concat(valueMatch.matches);
      }
    });
    return { matches, variableMatches };
  }

  compareHeadersMatch(xhrData, override, variables = []) {
    let isMatch = true;
    const xhrHeaders = xhrData.requestHeaders ?? [];
    const ovrrideHeaders = override.requestHeaders ?? [];
    const { matches, variableMatches } = this.getHeadersDiff(
      xhrHeaders,
      ovrrideHeaders,
      variables,
    );
    if (
      (xhrData.requestHeaders &&
        xhrData.requestHeaders?.length &&
        !override.requestHeaders) ||
      (!xhrData.requestHeaders &&
        override.requestHeaders &&
        override.requestHeaders?.length)
    ) {
      isMatch = false;
    } else {
      isMatch = !matches.find((match) => !match.isMatch);
    }
    return { isMatch, variableMatches, matches };
  }

  compareRequestBodyMatch(xhrData, override, variables = []) {
    const xhrBodyAsString = tryStringifyRequestBody(xhrData.requestBody ?? '');
    const overrideBodyAsString = tryStringifyRequestBody(
      getTotalResponse(override.requestBody) || '',
    );
    const result = this.matchStringWithVariables(
      xhrBodyAsString,
      overrideBodyAsString,
      variables,
    );
    return result;
  }

  // Checks if the given xhr matches to the override, returns boolean.
  compareXhrWithOverride(xhrData, override, variables = []) {
    let totalVariableMatches = [];
    for (let matcher of [
      this.compareUrlMatch,
      this.compareMethodMatch,
      this.compareHeadersMatch,
      this.compareRequestBodyMatch,
    ]) {
      const { isMatch, variableMatches } = matcher.bind(this)(
        xhrData,
        override,
        variables,
      );
      if (!isMatch) {
        return { isMatch: false };
      }
      totalVariableMatches = totalVariableMatches.concat(
        ...(variableMatches || []),
      );
    }
    return { isMatch: true, variableMatches: totalVariableMatches };
  }
}

export default new Overrides();
