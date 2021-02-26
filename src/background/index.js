import { updateLoadedIcon } from '../common/utils';
import pluginMessaging from '../content/communication/PluginMessaging';
import EVENTS from '../common/communication/plugin/events';

// Change the icon of the extension if we change the page.
const browser = window.browser || window.chrome;
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  updateLoadedIcon(tab);
});

pluginMessaging.subscribe(EVENTS.NODE_TOGGLED, () => {
  updateLoadedIcon();
});
