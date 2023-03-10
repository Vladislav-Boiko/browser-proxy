import Messaging from '../../common/communication/Messaging';
let browser = null;
try {
  if (typeof window !== 'undefined') {
    browser = window.browser || window.chrome;
    if (!('process' in window)) {
      window.process = {};
    }
  } else {
    // eslint-disable-next-line no-restricted-globals
    browser = self;
  }
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
        this.onMessage(message);
      });
    }
  }

  sendMessage(message) {
    if (browser?.runtime && browser.runtime.sendMessage) {
      browser.runtime.sendMessage(message);
    }
  }
}

export default new PluginMessaging();
