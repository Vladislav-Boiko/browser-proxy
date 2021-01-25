import requests from './communication/RequestsCommunication';
import pluginMessaging from './communication/PluginMessaging';
import PLUGIN_EVENTS from '../common/communication/plugin/events';
import overrides from './overrides/Overrides';
import { WINDOW_UUID, DOMAIN } from './constants';

const { WINDOW_UNLOAD } = PLUGIN_EVENTS;

export default () => {
  requests.startCommunication(WINDOW_UUID, DOMAIN);
  overrides.startTracking();
  window.onbeforeunload = () => {
    pluginMessaging.emit(WINDOW_UNLOAD, WINDOW_UUID);
  };
};
