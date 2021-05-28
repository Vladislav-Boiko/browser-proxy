import serializer from '../common/storage/Serializer';
import { hasUrlMatch } from 'utils/url';

export const getResponseLength = (responseBody) => {
  return (
    responseBody?.reduce((acc, { value }) => acc + value?.length || 0, 0) || 0
  );
};

export const getTotalResponse = (responseBody) =>
  responseBody?.reduce((acc, { value }) => acc + (value || ''), '') || '';

export const tryStringifyRequestBody = (value) => {
  let result = null;
  let requestBody = value;
  if (value instanceof URLSearchParams) {
    requestBody = value.toString();
  }
  try {
    const parsed = JSON.parse(requestBody);
    result = JSON.stringify(parsed || '');
  } catch (e) {
    // do nothing
  }
  if (!result) {
    result = requestBody;
  }
  return result;
};

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

export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const blobToBase64 = async (blob) => {
  if (blob && blob instanceof Blob) {
    const buffer = await blob.arrayBuffer();
    return arrayBufferToBase64(buffer);
  }
  return '';
};
