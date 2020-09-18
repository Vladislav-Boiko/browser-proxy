import { startMessaging } from "./communication/withPage";
import storage from "../common/storage/OverridesStorage";
import store from "./redux/store";
import { loadOverrides, setTabDomain } from "./redux/actions";

const bootstrapOverrides = async () => {
  const overrides = await storage.getAllOverrides();
  store.dispatch(loadOverrides(overrides));
};

const bootstrapTabData = async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    store.dispatch(setTabDomain(url.hostname));
  });
};

export default () => {
  startMessaging();
  bootstrapOverrides();
  bootstrapTabData();
};
