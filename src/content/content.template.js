// Only inject scripts on html pages
if (document.documentElement.nodeName === "HTML") {
  let requests = [];
  // TODO: change this on a messaging system
  window.addEventListener(
    "message",
    (event) => {
      if (
        event?.data?.sender &&
        event?.data?.sender === "browser-proxy-web-script"
      ) {
        const message = event.data;
        console.log("received a message from the page: ", message);
        if (message.type === "REQUEST") {
          requests.push(message.payload);
          console.log("updated requests: ", requests);
        }
      }
    },
    false
  );

  const code = `PLACEHOLDER
  `;
  // We have to inject the code, as the content script cannot set the xhr of page window.
  window.location = `javascript: ${code}`;
}
