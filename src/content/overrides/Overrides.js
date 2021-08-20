import serializer from '../../common/storage/Serializer';
import pluginMessaging from '../communication/PluginMessaging';
import PLUGIN_EVENTS from '../../common/communication/plugin/events';
import PROXY_EVENTS from '../../common/communication/injected/events';
import proxyMessaging from '../../common/communication/injected/ProxyMessaging';
import { getDomainForActiveUrl } from '../../popup/redux/activeWindows/selectors';
import { DOMAIN } from '../../content/constants';

class Overrides {
  overrides = {};

  startTracking() {
    this.updateOverrides();
    pluginMessaging.subscribe(PLUGIN_EVENTS.OVERRIDES_UPDATED, (update) =>
      this.updateOverrides(update),
    );
    pluginMessaging.subscribe(PROXY_EVENTS.REQUEST_OVERRIDES_UPDATE, () => {
      proxyMessaging.emit(PROXY_EVENTS.OVERRIDES_UPDATED, this.overrides);
    });
    proxyMessaging.subscribe(PROXY_EVENTS.REQUEST_OVERRIDES_UPDATE, () => {
      proxyMessaging.emit(PROXY_EVENTS.OVERRIDES_UPDATED, this.overrides);
    });
  }

  async updateOverrides(update) {
    const store = update || (await serializer.loadStore());
    this.overrides = getDomainForActiveUrl(DOMAIN)(store) || {};
    proxyMessaging.emit(PROXY_EVENTS.OVERRIDES_UPDATED, this.overrides);
  }
}

export default new Overrides();
