import EVENTS from "./communication/events";
import proxyMessaging from "./communication/ProxyMessaging";
const { XHR_SENT, XHR_STATE_CHANGED, XHR_PROGRESS, XHR_LOADED } = EVENTS;

// Only inject scripts on html pages
if (document.documentElement.nodeName === "HTML") {
  let requests = [];
  proxyMessaging.subscribe(XHR_SENT, (message) => {
    requests.push(message);
    console.log("new XHR: ", requests);
  });

  proxyMessaging.subscribe(
    [XHR_STATE_CHANGED, XHR_PROGRESS, XHR_LOADED],
    (message) => {
      const request = requests.find(({ id }) => id === message.id);
      if (request) {
        Object.assign(request, message);
      }
      console.log("event: ", requests);
    }
  );

  const code = "PLACEHOLDER";
  // We have to inject the code, as the content script cannot set the xhr of page window.
  window.location = `javascript: ${code}`;
}
