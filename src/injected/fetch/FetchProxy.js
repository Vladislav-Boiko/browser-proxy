import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';
import overridesStorage from '../overrides/Overrides';
import { getTotalResponse } from '../../common/utils';
import { v4 as uuid } from 'uuid';

const getFetchTrack = (argumentsList) => {
  const url = argumentsList[0];
  let payload = {
    method: 'GET',
  };
  if (typeof argumentsList[1] === 'object') {
    payload = Object.assign({}, argumentsList[1]);
    let headers = [];
    if (payload.headers) {
      if (payload.headers instanceof Headers) {
        for (let key of payload.headers.keys()) {
          headers.push({ name: key, value: payload.headers.get(key) });
        }
      } else {
        headers = Object.keys(payload.headers).map((key) => ({
          name: key,
          value: payload.headers[key],
        }));
      }
      payload.headers = headers;
    }
  }
  return {
    url,
    method: payload.method,
    requestBody: payload.body || '',
    requestHeaders: payload.headers || [],
  };
};

const startTracking = (fetchTrack, id = uuid()) => {
  messaging.emit(EVENTS.FETCH_SENT, {
    id,
    sentTimestamp: Date.now(),
    ...fetchTrack,
  });
  return id;
};

const finishTracking = async (id, response) => {
  const text = await response.text();
  messaging.emit(EVENTS.FETCH_STATE_CHANGED, {
    id,
    status: response.status,
    response: text,
    chunkTimestamp: Date.now(),
    loadendTimestamp: Date.now(),
    responseURL: response.url,
  });
};

// TODO: such magic shall not appear at all
const stripMs = (delay) => +(delay + '')?.split('ms')[0];

export default (window) => {
  window.fetch = new Proxy(window.fetch, {
    async apply(target, thisArg, argumentsList) {
      const fetchTrack = getFetchTrack(argumentsList);
      const override = await overridesStorage.findOverride(fetchTrack);
      const id = startTracking(
        { ...fetchTrack, isProxied: !!override },
        override?.id,
      );
      if (override) {
        return new Promise(async (resolve, reject) => {
          let headers = new Headers();
          for (let { name, value } of override?.responseHeaders || []) {
            headers.append(name, value);
          }
          for (let chunk of override.responseBody || []) {
            await new Promise((resolve) =>
              setTimeout(resolve, stripMs(chunk.delay)),
            );
          }
          const response = new Response(
            getTotalResponse(override.responseBody),
            {
              status: override.responseCode || 200,
              headers,
              url: override.responseURL,
            },
          );
          finishTracking(id, response.clone());
          resolve(response);
        });
      } else {
        const fetchResponse = Reflect.apply(target, window, argumentsList);
        return new Promise((resolve, reject) => {
          fetchResponse
            .then((response) => {
              finishTracking(id, response.clone());
              return resolve(response);
            })
            .catch((error) => reject(error));
        });
      }
    },
  });
};
