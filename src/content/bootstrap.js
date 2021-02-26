import requests from './communication/RequestsCommunication';
import pluginMessaging from './communication/PluginMessaging';
import PLUGIN_EVENTS from '../common/communication/plugin/events';
import overrides from './overrides/Overrides';
import serializer from '../common/storage/Serializer';
import { hasUrlMatch } from 'utils/url';
import { WINDOW_UUID, DOMAIN } from './constants';

const { WINDOW_UNLOAD } = PLUGIN_EVENTS;

export default () => {
  return new Promise(async (resolve, reject) => {
    requests.startCommunication(WINDOW_UUID, DOMAIN);
    const store = await serializer.loadStore();
    const domain = store.nodes?.find(({ activeUrls }) =>
      hasUrlMatch(DOMAIN, activeUrls),
    );
    if (domain?.isOn) {
      overrides.startTracking();
    }
    window.onbeforeunload = () => {
      pluginMessaging.emit(WINDOW_UNLOAD, WINDOW_UUID);
    };
    resolve(!!domain?.isOn);
  });
};
