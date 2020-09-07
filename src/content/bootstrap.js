import requests from "./communication/RequestsCommunication";
import pluginMessaging from "./communication/PluginMessaging";
import PLUGIN_EVENTS from "../common/communication/plugin/events";
import overrides from "./overrides/Overrides";
import { WINDOW_UUID } from "./constants";

const { UNLOAD_WINDOW } = PLUGIN_EVENTS;

export default () => {
  requests.startCommunication(WINDOW_UUID);
  overrides.startTracking();
  window.onbeforeunload = () => {
    pluginMessaging.emit(UNLOAD_WINDOW, {
      [WINDOW_UUID]: [],
    });
  };
};
