import { updateLoadedIcon } from '../common/utils';
import pluginMessaging from '../content/communication/PluginMessaging';
import EVENTS from '../common/communication/plugin/events';
import browser from 'src/common/browser';

try {
  // Change the icon of the extension if we change the page.
  browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    updateLoadedIcon(tab);
  });

  pluginMessaging.subscribe(
    [EVENTS.NODE_TOGGLED, EVENTS.OVERRIDES_UPDATED],
    () => {
      updateLoadedIcon();
    },
  );
} catch (e) {
  console.warn('Browser-proxy extension: ', e);
}
