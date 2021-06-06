import Messaging from '../../common/communication/Messaging';

const browser = window.browser || window.chrome;
class PluginMessaging extends Messaging {
  constructor() {
    super();
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener((message) => {
        this.onMessage(message);
      });
    }
  }

  sendMessage(message) {
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
