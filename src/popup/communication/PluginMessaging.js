import Messaging from '../../common/communication/Messaging';
// import browser from 'src/common/browser';
let browser = null;
try {
  if (typeof window !== 'undefined') {
    browser = window.browser || window.chrome;
    if (!('process' in window)) {
      window.process = {};
    }
  }
} catch (e) {
  // probably within service worker, we do not have window there.
  // eslint-disable-next-line no-restricted-globals
  browser = self;
}
if (!browser) {
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
    if (browser?.tabs?.query) {
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (typeof browser?.app?.isInstalled !== 'undefined' && browser?.tabs) {
          tabs && tabs[0] && browser.tabs.sendMessage(tabs[0].id, message);
        }
      });
    }
  }
}

export default new PluginMessaging();
