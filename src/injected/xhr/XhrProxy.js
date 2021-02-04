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
        };
        Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }

  setRequestHeader(realSetRequestHeader, xhrMock) {
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
