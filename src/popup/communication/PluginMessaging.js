import Messaging from "../../common/communication/Messaging";

class PluginMessaging extends Messaging {
  constructor() {
    super();
    chrome.runtime.onMessage.addListener((message) => this.onMessage(message));
  }

  send(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
      chrome.tabs.sendMessage(tabs[0].id, message)
    );
  }
}

export default new PluginMessaging();
