import PROXY_EVENTS from "./communication/events";
import PLUGIN_EVENTS from "../common/communication/events";
import proxyMessaging from "./communication/ProxyMessaging";
import pluginMessaging from "../common/communication/PluginMessaging";
import { v4 as uuid } from "uuid";

const { XHR_SENT, XHR_STATE_CHANGED, XHR_PROGRESS, XHR_LOADED } = PROXY_EVENTS;
const { REQUESTS_UPDATED } = PLUGIN_EVENTS;

const WINDOW_UUID = uuid();
console.log("Loaded content script and will use the id: ", WINDOW_UUID);

// Only inject scripts on html pages
if (document.documentElement.nodeName === "HTML") {
  let requests = [];
  proxyMessaging.subscribe(XHR_SENT, (message) => {
    requests.push(message);
    //console.log("new XHR: ", requests);
    pluginMessaging.emit(REQUESTS_UPDATED, {
      [WINDOW_UUID]: requests,
    });
  });

  proxyMessaging.subscribe(
    [XHR_STATE_CHANGED, XHR_PROGRESS, XHR_LOADED],
    (message) => {
      const request = requests.find(({ id }) => id === message.id);
      if (request) {
        Object.assign(request, message);
      }
      pluginMessaging.emit(REQUESTS_UPDATED, {
        [WINDOW_UUID]: requests,
      });
      // console.log("event: ", requests);
    }
  );

  const code = "PLACEHOLDER";
  // We have to inject the code, as the content script cannot set the xhr of page window.
  window.location = `javascript: ${code}`;
}
