import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';

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
        await new Promise((resolve) =>
          setTimeout(resolve, WAIT_OVERRIDES_LOADED_DELAY),
        );
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
    let variableMatches = [];
    for (let part of inflatedString) {
      if (typeof part === 'string') {
        if (processedString.slice(0, part.length) !== part) {
          return { isMatch: false };
        }
        processedString = processedString.slice(part.length);
      } else if (typeof part === 'object') {
        const regexp = new RegExp(part.value);
        const result = regexp.exec(processedString);
        if (!result || result.index !== 0) {
          return { isMatch: false };
        }
        processedString = processedString.slice(result[0].length);
        variableMatches.push({ ...part, match: result[0] });
      }
    }
    return { isMatch: !processedString, variableMatches };
  }

  matchStringWithVariables(
    stringWithoutVariables,
    stringWithVariables,
    variables = [],
  ) {
    if (!stringWithoutVariables && !stringWithVariables) {
      return { isMatch: true };
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
    return this.matchStringWithVariables(xhrData.url, override.url, variables);
  }

  compareMethodMatch(xhrData, override, variables = []) {
    const methodMatch = this.matchStringWithVariables(
      xhrData.method,
      override.method,
      variables,
    );
    if (methodMatch.isMatch) {
      return methodMatch;
    }
    return this.matchStringWithVariables(
      xhrData.method,
      override.type,
      variables,
    );
  }

  compareHeadersMatch(xhrData, override, variables = []) {
    let isMatch = true;
    let variableMatches = [];
    if (
      (xhrData.requestHeaders &&
        xhrData.requestHeaders?.length &&
        !override.requestHeaders) ||
      (!xhrData.requestHeaders &&
        override.requestHeaders &&
        override.requestHeaders?.length)
    ) {
      return { isMatch: false };
    }
    if (xhrData.requestHeaders && override.requestHeaders) {
      isMatch &= xhrData.requestHeaders.reduce((acc, header) => {
        return (
          acc &&
          !!override.requestHeaders.find((overrideHeader) => {
            const headerNameMatch = this.matchStringWithVariables(
              header.name,
              overrideHeader.name,
              variables,
            );
            const headerValueMatch = this.matchStringWithVariables(
              header.value,
              overrideHeader.value,
              variables,
            );
            variableMatches.concat(...(headerNameMatch.variableMatches || []));
            variableMatches.concat(...(headerValueMatch.variableMatches || []));
            return headerNameMatch.isMatch && headerValueMatch.isMatch;
          })
        );
      }, true);
    }
    return { isMatch, variableMatches };
  }

  // checks if the given xhr matches to the override, returns boolean.
  compareXhrWithOverride(xhrData, override, variables = []) {
    let variableMatches = [];
    const urlMatch = this.compareUrlMatch(xhrData, override, variables);
    if (!urlMatch.isMatch) {
      return { isMatch: false };
    }
    variableMatches = variableMatches.concat(
      ...(urlMatch.variableMatches || []),
    );
    const methodMatch = this.compareMethodMatch(xhrData, override, variables);
    if (!methodMatch.isMatch) {
      return { isMatch: false };
    }
    variableMatches = variableMatches.concat(
      ...(methodMatch.variableMatches || []),
    );
    const headersMatch = this.compareHeadersMatch(xhrData, override, variables);
    if (!headersMatch.isMatch) {
      return { isMatch: false };
    }
    variableMatches = variableMatches.concat(
      ...(headersMatch.variableMatches || []),
    );
    return { isMatch: true, variableMatches };
  }
}

export default new Overrides();
