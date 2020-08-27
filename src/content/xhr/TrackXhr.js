import messaging from "../communication/ProxyMessaging";
import { v4 as uuid } from "uuid";
import EVENTS from "../communication/events";

export const trackXhr = (requestPayload, xhr) => {
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
      status: xhr.status,
    });
  });

  xhr.addEventListener("progress", ({ loaded, total }) => {
    messaging.emit(EVENTS.XHR_PROGRESS, {
      id,
      progress: { loaded, total },
    });
  });
};
