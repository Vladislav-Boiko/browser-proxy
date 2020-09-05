import Messaging from "../Messaging";

// The injected js on the page, that has access to the wnidow xhr objects, has no
// access to the chrome messaging api.
// TODO: security
class ProxyMessaging extends Messaging {
  constructor() {
    super();
    window.addEventListener(
      "message",
      (event) => {
        if (
          event.origin === window.location.origin &&
          event?.data?.sender &&
          event?.data?.sender === "browser-proxy-web-script"
        ) {
          this.onMessage(event.data);
        }
      },
      false
    );
  }

  // TODO: a better way to distinguish messages
  send(message) {
    const destination = window.location.origin;
    // TODO: test it works with file:// protocol
    if (destination) {
      try {
        window.postMessage(
          { ...message, sender: "browser-proxy-web-script" },
          destination
        );
      } catch (e) {
        // do nothing, we cannot override what we cannot track
      }
    }
  }
}

export default new ProxyMessaging();
