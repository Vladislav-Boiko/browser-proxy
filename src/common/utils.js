import serializer from '../common/storage/Serializer';
import { hasUrlMatch } from 'utils/url';

export const getResponseLength = (responseBody) => {
  return (
    responseBody?.reduce((acc, { value }) => acc + value?.length || 0, 0) || 0
  );
};

export const getTotalResponse = (responseBody) =>
  responseBody?.reduce((acc, { value }) => acc + (value || ''), '') || '';
export const changeTabIcon = (tab) => {
  if (tab?.url) {
    serializer.loadStore().then((store) => {
      const browser = window.browser || window.chrome;
      const domain = store.nodes?.find(({ activeUrls }) =>
        hasUrlMatch(tab?.url, activeUrls),
      );
      if (domain?.isOn) {
        browser?.browserAction &&
          browser.browserAction.setIcon({
            tabId: tab?.id,
            path: '/logo64.png',
          });
      } else {
        browser?.browserAction &&
          browser.browserAction.setIcon({
            tabId: tab?.id,
            path: '/logo-disabled64.png',
          });
      }
    });
  }
};

export const updateLoadedIcon = (tab) => {
  if (!tab) {
    const browser = window.browser || window.chrome;
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      changeTabIcon(tab);
    });
  } else {
    changeTabIcon(tab);
  }
};

// TODO: such magic shall not appear at all
export const stripMs = (delay) => +(delay + '')?.split('ms')[0];
