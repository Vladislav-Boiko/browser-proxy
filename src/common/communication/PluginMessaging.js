import Messaging from "./Messaging";

class PluginMessaging extends Messaging {
  constructor() {
    super();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
      this.onMessage(message)
    );
  }

  send(message) {
    chrome.runtime.sendMessage(message);
  }
}

export default new PluginMessaging();
