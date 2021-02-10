import XhrProxy from './XhrProxy';

// Wraps a real xhr with its proxy.
const proxyXhr = (realXhr, xhrProxy) => {
  return new Proxy(realXhr, {
    get(target, property) {
      // Only exposing actual xhr properties.
      if (!(property in realXhr)) {
        return undefined;
      }
      const realValue = Reflect.get(target, property);
      let value = realValue;
      if (property in xhrProxy) {
        if (typeof xhrProxy[property] === 'function') {
          value = xhrProxy[property](realValue);
        } else {
          value = xhrProxy[property];
        }
      }
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set(target, prop, value) {
      return Reflect.set(target, prop, value);
    },
  });
};

const proxyXMLHttpRequestOnWindow = (window) => {
  window.XMLHttpRequest = new Proxy(window.XMLHttpRequest, {
    construct(target, args) {
      const realXhr = new target(...args);
      const xhrProxy = new XhrProxy(realXhr);
      return proxyXhr(realXhr, xhrProxy);
    },
  });
};

export default proxyXMLHttpRequestOnWindow;
