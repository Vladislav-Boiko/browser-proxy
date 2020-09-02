import PROXY_EVENTS from "./communication/events";
import PLUGIN_EVENTS from "../common/communication/events";
import proxyMessaging from "./communication/ProxyMessaging";
import pluginMessaging from "./communication/PluginMessaging";
import { v4 as uuid } from "uuid";

const {
  XHR_SENT,
  XHR_STATE_CHANGED,
  XHR_PROGRESS,
  XHR_LOADED,
  FETCH_SENT,
  FETCH_STATE_CHANGED,
} = PROXY_EVENTS;
const { REQUESTS_UPDATED, ASK_REQUESTS } = PLUGIN_EVENTS;

const WINDOW_UUID = uuid();

// Only inject scripts on html pages
if (document.documentElement.nodeName === "HTML") {
  let requests = [];

  proxyMessaging.subscribe([XHR_SENT, FETCH_SENT], (message) => {
    requests.push(message);
    pluginMessaging.emit(REQUESTS_UPDATED, {
      [WINDOW_UUID]: requests,
    });
  });

  proxyMessaging.subscribe(
    [XHR_STATE_CHANGED, XHR_PROGRESS, XHR_LOADED, FETCH_STATE_CHANGED],
    (message) => {
      const request = requests.find(({ id }) => id === message.id);
      if (request) {
        Object.assign(request, message);
      }
      pluginMessaging.emit(REQUESTS_UPDATED, {
        [WINDOW_UUID]: requests,
      });
    }
  );

  pluginMessaging.subscribe(ASK_REQUESTS, () =>
    pluginMessaging.emit(REQUESTS_UPDATED, {
      [WINDOW_UUID]: requests,
    })
  );

  const code = "PLACEHOLDER";
  // We have to inject the code, as the content script cannot set the xhr of page window.
  window.location = `javascript: ${code}`;
}
