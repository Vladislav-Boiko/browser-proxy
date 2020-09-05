import PROXY_EVENTS from "../../common/communication/injected/events";
import PLUGIN_EVENTS from "../../common/communication/plugin/events";
import proxyMessaging from "../../common/communication/injected/ProxyMessaging";
import pluginMessaging from "./PluginMessaging";

const {
  XHR_SENT,
  XHR_STATE_CHANGED,
  XHR_PROGRESS,
  XHR_LOADED,
  FETCH_SENT,
  FETCH_STATE_CHANGED,
} = PROXY_EVENTS;
const { REQUESTS_UPDATED, ASK_REQUESTS } = PLUGIN_EVENTS;

class RequestsCommunication {
  requests = [];
  windowId = "";

  startCommunication(windowId) {
    this.windowId = windowId;
    this.listenOnRequestsAsked();
    this.listenOnRequestSent();
    this.listenRequestStateChanged();
  }

  listenOnRequestsAsked() {
    pluginMessaging.subscribe(ASK_REQUESTS, () =>
      pluginMessaging.emit(REQUESTS_UPDATED, {
        [this.windowId]: this.requests,
      })
    );
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
      [XHR_STATE_CHANGED, XHR_PROGRESS, XHR_LOADED, FETCH_STATE_CHANGED],
      (message) => {
        let request = this.requests.find(({ id }) => id === message.id);
        if (request) {
          Object.assign(request, message);
        }
        pluginMessaging.emit(REQUESTS_UPDATED, {
          [this.windowId]: this.requests,
        });
      }
    );
  }
}

export default new RequestsCommunication();
