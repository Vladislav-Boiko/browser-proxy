import requests from "./communication/RequestsCommunication";
import pluginMessaging from "./communication/PluginMessaging";
import PLUGIN_EVENTS from "../common/communication/plugin/events";
import overrides from "./overrides/Overrides";
import { v4 as uuid } from "uuid";

const { UNLOAD_WINDOW } = PLUGIN_EVENTS;

export default () => {
  const WINDOW_UUID = uuid();
  requests.startCommunication(WINDOW_UUID);
  overrides.startTracking();
  window.onbeforeunload = () => {
    pluginMessaging.emit(UNLOAD_WINDOW, {
      [WINDOW_UUID]: [],
    });
  };
};
