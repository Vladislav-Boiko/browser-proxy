import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';
import overridesStorage from '../overrides/Overrides';
import {
  getTotalResponse,
  stripMs,
  tryStringifyRequestBody,
} from '../../common/utils';
import { v4 as uuid } from 'uuid';

/**
 * Based on the arguments provided to the fetch function by caller,
 * builds an object to represent this call in the browser-proxy tracking.
 */
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
    type: payload.method?.toUpperCase(),
    method: payload.method?.toUpperCase(),
    requestBody: payload.body ? tryStringifyRequestBody(payload.body) : '',
    requestHeaders: payload.headers || [],
  };
};

/**
 * Notifies the extension to track this call, and possibly override later.
 */
const startTracking = (fetchTrack) => {
  const id = uuid();
  messaging.emit(EVENTS.FETCH_SENT, {
    id,
    sentTimestamp: Date.now(),
    ...fetchTrack,
  });
  return id;
};

/**
 * After the call finished, we as well finish its tracking by notifying
 * the extension about it.
 */
const finishTracking = async (id, response) => {
  let text = '';
  try {
    text = response.text ? await response.text() : '';
  } catch (e) {
    text = e?.message || '';
  }
  messaging.emit(EVENTS.FETCH_STATE_CHANGED, {
    id,
    status: response.status === 0 ? response.status : +response.status || 200,
    response: text,
    chunkTimestamp: Date.now(),
    loadendTimestamp: Date.now(),
    responseURL: response.url,
    readyState: 4,
  });
};

const getOverrideResponse = (override) => {
  const totalResponse = getTotalResponse(override.responseBody);
  if (override?.responseType?.toUpperCase() === 'ARRAYBUFFER') {
    try {
      return atob(totalResponse);
    } catch (e) {
      // skip
    }
  }
  return totalResponse;
};

const overrideFetch = (id, override) => {
  // TODO: give the user possibility to reject overriden fetch requests
  return new Promise(async (resolve, reject) => {
    let headers = new Headers();
    for (let { name, value } of override?.responseHeaders || []) {
      headers.append(name, value);
    }
    for (let chunk of override.responseBody || []) {
      await new Promise((resolve) => setTimeout(resolve, stripMs(chunk.delay)));
    }
    const response = new Response(getOverrideResponse(override), {
      status: override.responseCode || 200,
      headers,
      url: override.responseURL,
    });
    await finishTracking(id, response.clone());
    resolve(response);
  });
};

const passFetchTrough = (id, target, thisArg, argumentsList) => {
  const fetchResponse = Reflect.apply(target, thisArg, argumentsList);
  return new Promise((resolve, reject) => {
    fetchResponse
      .then(async (response) => {
        // We need to await until tracking is finished, as if the user aborts a request
        // right after hee received it, we will be not able to track data for it
        await finishTracking(id, response.clone());
        return resolve(response);
      })
      .catch(async (error) => {
        await finishTracking(id, {
          status: 0,
          text: () => error?.message || '',
        });
        reject(error);
      });
  });
};

export default (window) => {
  window.fetch = new Proxy(window.fetch, {
    async apply(target, thisArg, argumentsList) {
      const fetchTrack = getFetchTrack(argumentsList);
      const override = await overridesStorage.findOverride(fetchTrack);
      const id = startTracking({
        ...fetchTrack,
        isProxied: !!override,
        ...(!!override && { override }),
      });
      if (override) {
        return overrideFetch(id, override);
      } else {
        return passFetchTrough(id, target, thisArg, argumentsList);
      }
    },
  });
};
