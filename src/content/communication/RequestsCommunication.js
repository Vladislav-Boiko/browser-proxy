import PROXY_EVENTS from '../../common/communication/injected/events';
import PLUGIN_EVENTS from '../../common/communication/plugin/events';
import proxyMessaging from '../../common/communication/injected/ProxyMessaging';
import { updateLoadedIcon } from '../../common/utils';
import pluginMessaging from './PluginMessaging';

const {
  XHR_SENT,
  XHR_STATE_CHANGED,
  XHR_PROGRESS,
  XHR_LOADED,
  FETCH_SENT,
  FETCH_STATE_CHANGED,
  XHR_UPLOAD_PROGRESS,
} = PROXY_EVENTS;
const { REQUESTS_UPDATED, PLUGIN_LOAD, WINDOW_LOAD, NODE_TOGGLED } = PLUGIN_EVENTS;

class RequestsCommunication {
  requests = [];
  windowId = '';
  domain = '';

  startCommunication(windowId, domain) {
    this.windowId = windowId;
    this.domain = domain;
    this.listenOnPluginLoad();
    this.listenOnRequestSent();
    this.listenRequestStateChanged();
    this.listenOnDomainDisabled();
    this.registerWindowToItsDomainMapping(windowId, domain);
  }

  /**
   * A single domain (webpage) may have several windows, for instance in iframes. We want to track all
   * requests of a webpage, thus all requests of all its windows. To keep a track of all domain windows
   * we register windowId<->domain mappings on a window load.
   */
  registerWindowToItsDomainMapping(windowId, domain) {
    pluginMessaging.emit(WINDOW_LOAD, {
      windowId,
      domain,
    });
  }

  /**
   * When the user opens the popup or the plugin tab in the browser dev tools, the popup fires a request event.
   * This might happen at any time, as one can open and close the popup back and forth.
   */
  listenOnPluginLoad() {
    pluginMessaging.subscribe(PLUGIN_LOAD, () => {
      pluginMessaging.emit(REQUESTS_UPDATED, {
        [this.windowId]: this.requests,
      });
      this.registerWindowToItsDomainMapping(this.windowId, this.domain);
    });
  }

  listenOnRequestSent() {
    proxyMessaging.subscribe([XHR_SENT, FETCH_SENT], (message) => {
      this.requests.push(message);
      pluginMessaging.emit(REQUESTS_UPDATED, {
        [this.windowId]: this.requests,
      });
    });
  }

  listenRequestStateChanged() {
    proxyMessaging.subscribe(
      [
        XHR_STATE_CHANGED,
        XHR_PROGRESS,
        XHR_UPLOAD_PROGRESS,
        XHR_LOADED,
        FETCH_STATE_CHANGED,
      ],
      (message) => {
        let request = this.requests.find(({ id }) => id === message?.id);
        if (request) {
          Object.assign(request, message);
        }
        pluginMessaging.emit(REQUESTS_UPDATED, {
          [this.windowId]: this.requests,
        });
      },
    );
  }

  listenOnDomainDisabled() {
    pluginMessaging.subscribe([NODE_TOGGLED], () => {
      updateLoadedIcon();
    });
  }
}

export default new RequestsCommunication();
