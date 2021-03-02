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
    payload = argumentsList[1];
  }
  return {
    url,
    requestBody: payload.body || '',
  };
};

const startTracking = (fetchTrack) => {
  const id = uuid();
  messaging.emit(EVENTS.FETCH_SENT, {
    id,
    sentTimestamp: Date.now(),
    ...fetchTrack,
  });
  return id;
};

const finishTracking = async (id, response) =>
  messaging.emit(EVENTS.FETCH_STATE_CHANGED, {
    id,
    status: response.status,
    responseBody: await response.text(),
    chunkTimestamp: Date.now(),
    loadendTimestamp: Date.now(),
    responseURL: response.url,
  });

export default (window) => {
  window.fetch = new Proxy(window.fetch, {
    apply(target, thisArg, argumentsList) {
      const fetchTrack = getFetchTrack(argumentsList);
      const override = overridesStorage.findOverride(fetchTrack);
      if (override) {
        return new Promise(async (resolve, reject) => {
          let headers = new Headers();
          for (let { name, value } of override?.responseHeaders || []) {
            headers.append(name, value);
          }
          for (let chunk of override.responseBody || []) {
            await new Promise((resolve) => setTimeout(resolve, chunk.delay));
          }
          resolve(
            new Response(getTotalResponse(override.responseBody), {
              status: override.responseCode || 200,
              headers,
              url: override.responseURL,
            }),
          );
        });
      } else {
        const id = startTracking(fetchTrack);
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
