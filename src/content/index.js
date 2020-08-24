import EVENTS from "./communication/events";
import proxyMessaging from "./communication/ProxyMessaging";

// Only inject scripts on html pages
if (document.documentElement.nodeName === "HTML") {
  let requests = [];
  proxyMessaging.subscribe(EVENTS.REQUEST, (message) => {
    requests.push(message);
    console.log("updated requests: ", requests);
  });

  const code = "PLACEHOLDER";
  // We have to inject the code, as the content script cannot set the xhr of page window.
  window.location = `javascript: ${code}`;
}
