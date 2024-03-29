import browser from '../../browser';
import { DOMAIN } from '../../../content/constants';
import Messaging from '../Messaging';
import { v4 as uuid } from 'uuid';

let messagingBrowser = null;
try {
  messagingBrowser =
    typeof window !== 'undefined' &&
    typeof window?.postMessage === 'function' &&
    window;
} catch (e) {
  // maybe we are another browser.
}
if (!messagingBrowser) {
  messagingBrowser = browser;
}

/**
 * The injected js on the page, that has access to the window xhr objects, has no
 * access to the chrome messaging api.
 */
class ProxyMessaging extends Messaging {
  selfId = uuid();
  constructor() {
    super();
    if (typeof messagingBrowser?.addEventListener === 'function') {
      messagingBrowser.addEventListener(
        'message',
        (message) => {
          if (
            message.origin === (messagingBrowser?.location?.origin || DOMAIN) &&
            message?.data?.sender &&
            message?.data?.sender === 'browser-proxy-web-script'
          ) {
            if (message?.data?.selfId !== this.selfId) {
              this.onMessage({ ...message.data, selfId: this.selfId });
            }
          }
        },
        false,
      );
    }
  }

  // TODO: a better way to distinguish messages
  sendMessage(message) {
    let destination = messagingBrowser?.location?.origin;
    if (!destination || destination?.trim() === 'null') {
      // Chrome 95 made the iframes origins stored in ancestorOrigins
      destination = messagingBrowser?.location?.ancestorOrigins?.[0];
    }
    if (!destination || destination?.trim() === 'null') {
      destination = DOMAIN;
    }
    // TODO: test it works with file:// protocol
    if (destination) {
      try {
        if (typeof messagingBrowser?.postMessage === 'function') {
          messagingBrowser.postMessage(
            {
              ...message,
              sender: 'browser-proxy-web-script',
              selfId: this.selfId,
            },
            destination,
          );
        }
      } catch (e) {
        // do nothing, we cannot override what we cannot track
      }
    }
  }
}

export default new ProxyMessaging();
