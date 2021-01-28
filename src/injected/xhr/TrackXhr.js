import messaging from '../../common/communication/injected/ProxyMessaging';
import { v4 as uuid } from 'uuid';
import EVENTS from '../../common/communication/injected/events';
import { DOMAIN } from '../../content/constants';

export const trackXhr = (requestPayload, xhr) => {
  const id = uuid();
  const timestamp = Date.now();

  messaging.emit(EVENTS.XHR_SENT, {
    ...requestPayload,
    id,
    sentTimestamp: timestamp,
    domain: DOMAIN,
  });

  xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState !== 0 && xhr.status !== 0) {
      messaging.emit(EVENTS.XHR_STATE_CHANGED, {
        id,
        readyState: xhr.readyState,
        status: xhr.status,
        response: xhr.response,
        responseType: xhr.responseType,
        chunkTimestamp: Date.now(),
      });
    }
  });

  xhr.addEventListener('loadend', () => {
    messaging.emit(EVENTS.XHR_LOADED, {
      id,
      isLoaded: true,
      status: xhr.status,
      loadendTimestamp: Date.now(),
    });
  });

  xhr.addEventListener('progress', ({ loaded, total }) => {
    messaging.emit(EVENTS.XHR_PROGRESS, {
      id,
      progress: { loaded, total },
      status: xhr.status,
      chunkTimestamp: Date.now(),
    });
  });
};
