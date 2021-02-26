import Messaging from '../../common/communication/Messaging';

class PluginMessaging extends Messaging {
  constructor() {
    super();
    const browser = window.browser || window.chrome;
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener((message) => {
        this.onMessage(message);
      });
    }
  }

  sendMessage(message) {
    const browser = window.browser || window.chrome;
    if (
      browser?.runtime &&
      browser?.app &&
      typeof browser.app.isInstalled !== 'undefined'
    ) {
      browser.runtime.sendMessage(message);
    }
  }
}

export default new PluginMessaging();
