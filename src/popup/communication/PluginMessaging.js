import Messaging from '../../common/communication/Messaging';

class PluginMessaging extends Messaging {
  constructor() {
    super();
    chrome.runtime.onMessage.addListener((message) => this.onMessage(message));
  }

  sendMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (typeof chrome.app.isInstalled !== 'undefined' && chrome?.tabs) {
        tabs && tabs[0] && chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
}

export default new PluginMessaging();
