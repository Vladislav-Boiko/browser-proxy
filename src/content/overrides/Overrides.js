import storage from "../../common/storage/OverridesStorage";
import pluginMessaging from "../communication/PluginMessaging";
import PLUGIN_EVENTS from "../../common/communication/plugin/events";
import PROXY_EVENTS from "../../common/communication/injected/events";
import proxyMessaging from "../../common/communication/injected/ProxyMessaging";

class Overrides {
  overrides = {};

  startTracking() {
    this.updateOverrides();
    pluginMessaging.subscribe(PLUGIN_EVENTS.OVERRIDES_UPDATED, () =>
      this.updateOverrides()
    );
    pluginMessaging.subscribe(PROXY_EVENTS.REQUEST_OVERRIDES_UPDATE, () => {
      proxyMessaging.emit(PROXY_EVENTS.OVERRIDES_UPDATED, this.overrides);
    });
  }

  async updateOverrides() {
    this.overrides = (await storage.getAllOverridesForDomain()) || {};
    console.log("Will update overrides", proxyMessaging);
    proxyMessaging.emit(PROXY_EVENTS.OVERRIDES_UPDATED, this.overrides);
  }
}

export default new Overrides();
