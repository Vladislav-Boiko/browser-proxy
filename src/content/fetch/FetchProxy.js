import messaging from "../communication/ProxyMessaging";
import EVENTS from "../communication/events";
import { v4 as uuid } from "uuid";

//TODO: change
const serializeRequest = ({
  cache,
  context,
  credentials,
  destination,
  integrity,
  method,
  url,
  mode,
  redirect,
  referrer,
  referrerPolicy,
  body,
  bodyUsed,
}) => ({
  cache,
  context,
  credentials,
  destination,
  integrity,
  method,
  url,
  mode,
  redirect,
  referrer,
  referrerPolicy,
  body,
  bodyUsed,
});

const serializeOptions = (options = {}) => ({
  ...options,
  signal: null,
});

const startTracking = (argumentsList) => {
  const id = uuid();
  const timestamp = Date.now();
  const payload =
    typeof argumentsList[0] === "object"
      ? serializeRequest(argumentsList[0])
      : {
          url: argumentsList[0],
          method: "GET",
        };
  messaging.emit(EVENTS.FETCH_SENT, {
    id,
    timestamp,
    ...payload,
    ...serializeOptions(argumentsList[1]),
  });
  return id;
};

const finishTracking = async (id, response) =>
  messaging.emit(EVENTS.FETCH_STATE_CHANGED, {
    id,
    status: response.status,
    response: await response.text(),
  });

export default (window) => {
  window.fetch = new Proxy(window.fetch, {
    apply(target, thisArg, argumentsList) {
      const id = startTracking(argumentsList);
      const fetchResponse = Reflect.apply(target, window, argumentsList);
      return new Promise((resolve, reject) => {
        fetchResponse
          .then((response) => {
            finishTracking(id, response.clone());
            return resolve(response);
          })
          .catch((error) => reject(error));
      });
    },
  });
};
