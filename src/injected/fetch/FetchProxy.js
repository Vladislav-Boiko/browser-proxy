import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';
import { v4 as uuid } from 'uuid';

const mapRequestHeaders = (headers) => {
  if (!headers) {
    return [];
  }
  return Object.keys(headers).map((key) => ({
    name: key,
    value: headers[key],
  }));
};

// TODO: change
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
  headers,
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
  requestHeaders: mapRequestHeaders(headers),
});

const serializeOptions = (options = {}) => ({
  ...options,
  signal: null,
});

const startTracking = (argumentsList) => {
  const id = uuid();
  const url = argumentsList[0];
  const payload =
    typeof argumentsList[1] === 'object'
      ? serializeRequest(argumentsList[1])
      : {
          method: 'GET',
        };
  messaging.emit(EVENTS.FETCH_SENT, {
    id,
    sentTimestamp: Date.now(),
    ...payload,
    url,
    ...serializeOptions(argumentsList[1]),
  });
  return id;
};

const finishTracking = async (id, response) =>
  messaging.emit(EVENTS.FETCH_STATE_CHANGED, {
    id,
    status: response.status,
    response: await response.text(),
    chunkTimestamp: Date.now(),
    loadendTimestamp: Date.now(),
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
