import Messaging from "../../common/communication/Messaging";

class PluginMessaging extends Messaging {
  constructor() {
    super();
    chrome.runtime.onMessage.addListener((message) => {
      this.onMessage(message);
    });
  }

  sendMessage(message) {
    if (
      chrome?.runtime &&
      chrome?.app &&
      typeof chrome.app.isInstalled !== "undefined"
    ) {
      chrome.runtime.sendMessage(message);
    }
  }
}

export default new PluginMessaging();
