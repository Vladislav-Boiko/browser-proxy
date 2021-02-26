import { startMessaging } from './communication/withPage';
import serializer from '../common/storage/Serializer';
import { selectInitialDomain } from 'utils/url';
import store, { setState } from './redux/store';

const bootstrapTabData = async () => {
  const browser = window.browser || window.chrome;
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab?.url) {
      selectInitialDomain(tab?.url);
    }
  });
};

const bootstrapDevtoolsTab = () => {
  const browser = window.browser || window.chrome;
  if (browser.devtools) {
    browser.devtools.panels.create(
      'Browser-Proxy',
      '',
      'popup.html',
      (panel) => {},
    );
  }
};

const bootstrapStore = async () => {
  const storeFromLocalStorage = await serializer.loadStore();
  store.dispatch(setState(storeFromLocalStorage));
  // We shall first load the saved store to know if current domain has rules or is a new domain
  await bootstrapTabData();
};

export default () => {
  startMessaging();
  bootstrapDevtoolsTab();
  bootstrapStore();
};
