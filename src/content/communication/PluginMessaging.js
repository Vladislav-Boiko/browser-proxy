import Messaging from "../../common/communication/Messaging";

class PluginMessaging extends Messaging {
  constructor() {
    super();
    chrome.runtime.onMessage.addListener((message) => {
      this.onMessage(message);
    });
  }

  send(message) {
    chrome.runtime.sendMessage(message);
  }
}

export default new PluginMessaging();
