import browser from 'src/common/browser';
import Messaging from '../Messaging';

// The injected js on the page, that has access to the wnidow xhr objects, has no
// access to the chrome messaging api.
class ProxyMessaging extends Messaging {
  constructor() {
    super();
    browser.addEventListener(
      'message',
      (event) => {
        if (
          event.origin === browser.location.origin &&
          event?.data?.sender &&
          event?.data?.sender === 'browser-proxy-web-script'
        ) {
          this.onMessage(event.data);
        }
      },
      false,
    );
  }

  // TODO: a better way to distinguish messages
  sendMessage(message) {
    const destination = browser.location.origin;
    // TODO: test it works with file:// protocol
    if (destination) {
      try {
        browser.postMessage(
          { ...message, sender: 'browser-proxy-web-script' },
          destination,
        );
      } catch (e) {
        // do nothing, we cannot override what we cannot track
      }
    }
  }
}

export default new ProxyMessaging();
