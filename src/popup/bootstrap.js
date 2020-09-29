import { startMessaging } from "./communication/withPage";
import overridesStorage from "../common/storage/OverridesStorage";
import foldersStorage from "../common/storage/FoldersStorage";
import store from "./redux/store";
import { loadOverrides, loadFolders } from "./redux/storage/actions";
import { setCurrentTab } from "./redux/page/actions";
//setTabDomain } from "./redux/actions";

const bootstrapOverrides = async () => {
  const overrides = await overridesStorage.getAllOverrides();
  store.dispatch(loadOverrides(overrides));
};

const bootstrapFolders = async () => {
  const folders = await foldersStorage.getAllFolders();
  store.dispatch(loadFolders(folders));
};

const bootstrapTabData = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    store.dispatch(setCurrentTab(url.hostname));
    // TODO: select the current tab
  });
};

export default () => {
  startMessaging();
  bootstrapOverrides();
  bootstrapFolders();
  bootstrapTabData();
};
