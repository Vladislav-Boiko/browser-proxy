import messaging from "../communication/ProxyMessaging";
import EVENTS from "../communication/events";

export default (window) => {
  window.fetch = new Proxy(window.fetch, {
    apply(target, thisArg, argumentsList) {
      messaging.emit(EVENTS.FETCH_SENT, {
        url: argumentsList[0],
        ...(argumentsList[1] || {}),
      });
      return Reflect.apply(target, thisArg, argumentsList);
    },
  });
};
