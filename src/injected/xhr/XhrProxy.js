import { trackXhr } from './TrackXhr';
import overridesStorage from '../overrides/Overrides';
import Overrider from './Overrider';

class XhrProxy {
  openArguments = {};
  requestHeaders = [];
  override = null;

  open(realOpen) {
    let self = this;
    return new Proxy(realOpen, {
      apply(target, thisArg, argumentsList) {
        self.openArguments = {
          method: argumentsList[0],
          url: argumentsList[1],
          async: argumentsList[2] === false ? false : true,
        };
        Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }

  setRequestHeader(realSetRequestHeader) {
    let self = this;
    return new Proxy(realSetRequestHeader, {
      apply(target, thisArg, argumentsList) {
        const name = argumentsList.length > 0 ? argumentsList[0] : '';
        const value = argumentsList.length > 1 ? argumentsList[1] : '';
        self.requestHeaders.push({ name, value });
        Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }

  send(realSend, xhrMock) {
    const self = this;
    return new Proxy(realSend, {
      apply(target, thisArg, argumentsList) {
        const body = argumentsList[0];
        const xhrData = {
          ...self.openArguments,
          requestHeaders: self.requestHeaders,
          requestBody: body,
        };
        trackXhr(xhrData, xhrMock);
        const override = overridesStorage.findOverride(xhrData);
        if (override) {
          self.override = { mock: override, readyState: xhrMock.readyState };
          const overrider = new Overrider(self, xhrMock, override);
          overrider.doOverride(body, xhrMock.readyState);
        } else {
          Reflect.apply(target, thisArg, argumentsList);
        }
      },
    });
  }

  getResponseHeader(realGetResponseHeader, xhrMock) {
    let self = this;
    return new Proxy(realGetResponseHeader, {
      apply(target, thisArg, argumentsList) {
        if (self.override) {
          const responseHeaders = self.override?.mock?.responseHeaders;
          // 2 is ready state HEADERS_RECEIVED
          if (xhrMock.readyState >= 2 && responseHeaders) {
            const headerName = argumentsList[0];
            return (
              responseHeaders
                .filter(({ name }) => name === headerName)
                .map(({ value }) => value)
                .join(', ') || null
            );
          }
          return null;
        } else {
          Reflect.apply(target, thisArg, argumentsList);
        }
      },
    });
  }

  getAllResponseHeaders(realGetAllResponseHeaders, xhrMock) {
    let self = this;
    return new Proxy(realGetAllResponseHeaders, {
      apply(target, thisArg, argumentsList) {
        if (self.override) {
          const responseHeaders = self.override?.mock?.responseHeaders;
          // 2 is ready state HEADERS_RECEIVED
          if (xhrMock.readyState >= 2 && responseHeaders) {
            return (
              responseHeaders
                // no es6 template literals in injected script
                .map(({ name, value }) => name + ': ' + value)
                .join('\n\r') || null
            );
          }
          return null;
        } else {
          Reflect.apply(target, thisArg, argumentsList);
        }
      },
    });
  }

  abort(realAbort) {
    let self = this;
    return new Proxy(realAbort, {
      apply(target, thisArg, argumentsList) {
        if (self.override) {
          // TODO: shall we set it back to false in case of reopen?
          self.isAborted = true;
          self.override.readyState = 0;
          self.override.response = '';
        } else {
          Reflect.apply(target, thisArg, argumentsList);
        }
      },
    });
  }
}

const proxyXhr = (xhr) => {
  // TODO: better naming
  const xhrProxy = new XhrProxy();
  const xhrMock = new Proxy(xhr, {
    get(target, property) {
      let value = Reflect.get(target, property);
      if (property in xhrProxy) {
        value = xhrProxy[property](value, xhrMock);
      } else if (xhrProxy.override && property in xhrProxy.override) {
        value = xhrProxy.override[property];
      }
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set(target, prop, value) {
      return Reflect.set(target, prop, value);
    },
  });
  return xhrMock;
};

export default (window) => {
  window.XMLHttpRequest = new Proxy(window.XMLHttpRequest, {
    construct(target, args) {
      const xhr = new target(...args);
      return proxyXhr(xhr);
    },
  });
};
