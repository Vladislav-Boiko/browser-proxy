import Messaging from '../../common/communication/Messaging';

class PluginMessaging extends Messaging {
  constructor() {
    super();
    const browser = window.browser || window.chrome;
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener((message) =>
        this.onMessage(message),
      );
    }
  }

  sendMessage(message) {
    const browser = window.browser || window.chrome;
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (typeof browser.app.isInstalled !== 'undefined' && browser?.tabs) {
        tabs && tabs[0] && browser.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
}

export default new PluginMessaging();
