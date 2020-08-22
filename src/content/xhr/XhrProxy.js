import messaging from "../communication/ProxyMessaging";
import EVENTS from "../communication/events";

class XhrProxy {
  openArguments = null;

  constructor(xhr) {
    this.xhr = xhr;
  }

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

  send(realSend) {
    let self = this;
    return new Proxy(realSend, {
      apply(target, thisArg, argumentsList) {
        messaging.emit(EVENTS.REQUEST, {
          ...self.openArguments,
          body: argumentsList[0],
        });
        Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }
}

const proxyXhr = (xhr) => {
  const xhrProxy = new XhrProxy(xhr);
  xhr.xhrProxy = xhrProxy;
  return new Proxy(xhr, {
    get(target, property, receiver) {
      let value = Reflect.get(target, property);
      if (property in xhrProxy) {
        value = xhrProxy[property](value);
      }
      return typeof value === "function" ? value.bind(target) : value;
    },
    set(target, prop, value) {
      return Reflect.set(target, prop, value);
    },
  });
};

export default (window) => {
  window.XMLHttpRequest = new Proxy(window.XMLHttpRequest, {
    construct(target, args) {
      const xhr = new target(...args);
      return proxyXhr(xhr);
    },
  });
};
