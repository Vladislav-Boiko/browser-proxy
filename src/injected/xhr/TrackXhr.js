import messaging from '../../common/communication/injected/ProxyMessaging';
import { v4 as uuid } from 'uuid';
import EVENTS from '../../common/communication/injected/events';
import { DOMAIN } from '../../content/constants';
import { arrayBufferToBase64, blobToBase64 } from '../../common/utils';

const serializeResponse = async (xhr) => {
  switch (xhr.responseType?.toUpperCase()) {
    case 'ARRAYBUFFER':
      return arrayBufferToBase64(xhr.response);
    case 'BLOB':
      return await blobToBase64(xhr.response);
    default:
      return xhr.response;
  }
};

export const trackXhr = (requestPayload, xhr) => {
  const id = uuid();
  const timestamp = Date.now();

  messaging.emit(EVENTS.XHR_SENT, {
    ...requestPayload,
    id,
    sentTimestamp: timestamp,
    domain: DOMAIN,
  });

  const readystatechange = async () => {
    if (xhr.readyState !== 0 && xhr.status !== 0) {
      let update = {
        id,
        readyState: xhr.readyState,
        status: xhr.status,
        response: await serializeResponse(xhr),
        responseType: xhr.responseType,
        chunkTimestamp: Date.now(),
      };
      // 2 is HEADERS_RECEIVED
      if (xhr.readyState >= 2) {
        update.responseHeaders = xhr.getAllResponseHeaders();
      }
      messaging.emit(EVENTS.XHR_STATE_CHANGED, update);
    }
  };

  const progress = ({ loaded, total }) => {
    messaging.emit(EVENTS.XHR_PROGRESS, {
      id,
      progress: { loaded, total },
      status: xhr.status,
      chunkTimestamp: Date.now(),
      responseURL: xhr.responseURL,
    });
  };

  const loadend = () => {
    messaging.emit(EVENTS.XHR_LOADED, {
      id,
      isLoaded: true,
      status: xhr.status,
      loadendTimestamp: Date.now(),
      responseURL: xhr.responseURL,
    });
    xhr.removeEventListener('readystatechange', readystatechange);
    xhr.removeEventListener('loadend', loadend);
    xhr.removeEventListener('progress', progress);
  };

  xhr.addEventListener('readystatechange', readystatechange);
  xhr.addEventListener('loadend', loadend);
  xhr.addEventListener('progress', progress);

  return id;
};
