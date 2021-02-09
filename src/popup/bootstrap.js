import { startMessaging } from './communication/withPage';
import serializer from '../common/storage/Serializer';
import { selectInitialDomain } from 'utils/url';
import store, { setState } from './redux/store';
// import { loadOverrides, loadFolders } from './redux/storage/actions';
// import { setCurrentTab } from './redux/page/actions';
// import { selectItem } from './redux/navigation/actions';
// import { NAV_TYPES } from './utils/constants';

const bootstrapTabData = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab?.url) {
      selectInitialDomain(tab?.url);
    }
  });
};

const bootstrapDevtoolsTab = () => {
  if (chrome.devtools) {
    chrome.devtools.panels.create(
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
