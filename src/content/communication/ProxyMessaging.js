import Communication from "./Communication";

// The injected js on the page, that has access to the wnidow xhr objects, has no
// access to the chrome messaging api.
// TODO: security
class ProxyCommunication extends Communication {
  constructor() {
    super();
    window.addEventListener(
      "message",
      (event) => this.onMessage(event?.data),
      false
    );
  }

  send(message) {
    const destination = `${window.location.origin}`;
    // TODO: a better way to distinguish messages
    window.postMessage(
      { ...message, sender: "browser-proxy-web-script" },
      destination
    );
  }
}

export default new ProxyCommunication();
