import { startMessaging } from './communication/withPage';
import serializer from '../common/storage/Serializer.js';
import { selectInitialDomain } from 'utils/url';
// import store from './redux/store';
// import { loadOverrides, loadFolders } from './redux/storage/actions';
// import { setCurrentTab } from './redux/page/actions';
// import { selectItem } from './redux/navigation/actions';
// import { NAV_TYPES } from './utils/constants';

const bootstrapOverrides = async () => {
  const overrides = await serializer.getAllOverrides();
  // store.dispatch(loadOverrides(overrides));
};

const bootstrapFolders = async () => {
  const folders = await serializer.getAllFolders();
  // store.dispatch(loadFolders(folders));
};

const bootstrapTabData = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab?.url) {
      selectInitialDomain(tab?.url);
    }
    // if (tab?.url) {
    //   const url = new URL(tab.url);
    //   store.dispatch(setCurrentTab(url.hostname));
    //   store.dispatch(
    //     selectItem({ id: url.hostname, path: [], type: NAV_TYPES.DOMAIN }),
    //   );
    // }
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

export default () => {
  startMessaging();
  // bootstrapOverrides();
  // bootstrapFolders();
  bootstrapTabData();
  bootstrapDevtoolsTab();
};
