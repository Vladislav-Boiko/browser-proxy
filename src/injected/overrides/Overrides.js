import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';

class Overrides {
  overrides = {};

  startListening() {
    messaging.emit(EVENTS.REQUEST_OVERRIDES_UPDATE, {});
    messaging.subscribe(
      EVENTS.OVERRIDES_UPDATED,
      (overrides) => (this.overrides = overrides),
    );
  }

  // Traversing the overrides tree with any depth.
  recursivelySearchOverrides(xhrData, parent) {
    if (parent.nodes && parent.nodes.length) {
      const found = this.findOverrideAmong(
        xhrData,
        parent.nodes.filter(({ nodes }) => !nodes),
      );
      if (found) {
        return found;
      }
      for (let node of parent.nodes) {
        if (node.nodes && node.nodes.length) {
          const foundInSubnodes = this.recursivelySearchOverrides(
            xhrData,
            node,
          );
          if (foundInSubnodes) {
            return foundInSubnodes;
          }
        }
      }
    }
    return null;
  }

  findOverride(xhrData) {
    if (this.overrides) {
      // this.overrides is a domain node.
      return this.recursivelySearchOverrides(xhrData, this.overrides);
    }
    return null;
  }

  findOverrideAmong(xhrData, overrides) {
    return overrides.find((override) => {
      return this.compareXhrWithOverride(xhrData, override);
    });
  }

  // checks if the given xhr matches to the override, returns boolean.
  compareXhrWithOverride(xhrData, override) {
    let isMatch = true;
    isMatch &= xhrData.url === override.url;
    isMatch &= xhrData.method === override.method;
    if (
      (xhrData.requestHeaders && !override.requestHeaders) ||
      (!xhrData.requestHeaders && override.requestHeaders)
    ) {
      return false;
    }
    if (xhrData.requestHeaders && override.requestHeaders) {
      isMatch &= xhrData.requestHeaders.reduce((acc, header) => {
        return (
          acc &&
          !!override.requestHeaders.find(
            (overrideHeader) =>
              overrideHeader.name === header.name &&
              overrideHeader.value === header.value,
          )
        );
      }, true);
    }
    return isMatch;
  }
}

export default new Overrides();
