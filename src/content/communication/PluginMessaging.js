import Messaging from '../../common/communication/Messaging';
let browser = null;
try {
  browser = window.browser || window.chrome;
} catch (e) {
  // probably within service worker, we do not have window there.
  // eslint-disable-next-line no-restricted-globals
  browser = self;
}

class PluginMessaging extends Messaging {
  constructor() {
    super();
    if (browser?.runtime?.onMessage) {
      browser.runtime.onMessage.addListener((message) => {
        this.onMessage(message)
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