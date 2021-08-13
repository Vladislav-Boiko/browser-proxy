import { startMessaging } from './communication/withPage';
import serializer from '../common/storage/Serializer';
import { selectInitialDomain } from 'utils/url';
import store, { setState } from './redux/store';
import browser from 'src/common/browser';

const bootstrapTabData = async () => {
  const tabs = browser?.tabs || browser?.browser?.tabs || browser?.chrome?.tabs;
  if (tabs?.query) {
    tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.url) {
        selectInitialDomain(tab?.url);
      }
    });
  }
};

const bootstrapDevtoolsTab = () => {
  const devtools = browser?.devtools || browser?.browser?.devtools || browser?.chrome?.devtools;
  if (devtools?.panels) {
    devtools.panels.create(
      'Browser-Proxy',
      '',
      'popup.html',
      (panel) => { },
    );
  }
};

const bootstrapStore = async () => {
  try {
    const storeFromLocalStorage = await serializer.loadStore();
    store.dispatch(setState(storeFromLocalStorage));
    // We shall first load the saved store to know if current domain has rules or is a new domain
    await bootstrapTabData();
  } catch (e) {
    console.warn(e);
  }
};

export default async () => {
  await startMessaging();
  await bootstrapStore();
  await bootstrapDevtoolsTab();
};
