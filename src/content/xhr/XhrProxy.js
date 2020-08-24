import messaging from "../communication/ProxyMessaging";
import { v4 as uuid } from "uuid";
import EVENTS from "../communication/events";

const trackXhr = (requestPayload, xhr) => {
  const id = uuid();
  messaging.emit(EVENTS.XHR_SENT, {
    ...requestPayload,
    id,
  });
  xhr.addEventListener("readystatechange", () => {
    messaging.emit(EVENTS.XHR_STATE_CHANGED, {
      id,
      readyState: xhr.readyState,
      response: xhr.response,
      responseType: xhr.responseType,
    });
  });
  xhr.addEventListener("loadend", () => {
    messaging.emit(EVENTS.XHR_LOADED, {
      id,
      isLoaeded: true,
    });
  });
  xhr.addEventListener("progress", ({ loaded, total }) => {
    messaging.emit(EVENTS.XHR_PROGRESS, {
      id,
      progress: { loaded, total },
    });
  });
};

class XhrProxy {
  openArguments = null;

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
    const { openArguments } = this;
    return new Proxy(realSend, {
      apply(target, thisArg, argumentsList) {
        trackXhr({ ...openArguments, body: argumentsList[0] }, thisArg);
        Reflect.apply(target, thisArg, argumentsList);
      },
    });
  }
}

const proxyXhr = (xhr) => {
  const xhrProxy = new XhrProxy();
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
