import serializer from '../common/storage/Serializer';
import { hasUrlMatch } from 'utils/url';

export const getResponseLength = (responseBody) => {
  return (
    responseBody?.reduce((acc, { value }) => acc + value?.length || 0, 0) || 0
  );
};

export const getTotalResponse = (responseBody, type) => {
  if (type === 'ArrayBuffer') {
    const totalBuffer = responseBody?.reduce(
      (acc, { value }) => addArrayBufferResponseValue(acc, atob(value ?? '')),
      null,
    );
    return arrayBufferToBase64(totalBuffer);
  }
  return (
    responseBody?.reduce((acc, { value }) => acc + (value ?? ''), '') ?? ''
  );
};

export const tryStringifyRequestBody = (value) => {
  let result = null;
  let requestBody = value || '';
  if (Array.isArray(requestBody)) {
    requestBody = getTotalResponse(value);
  }
  if (value instanceof URLSearchParams || value instanceof FormData) {
    const entries = value?.entries();
    if (entries) {
      requestBody = [...entries]
        .map((entry) => decodeURIComponent(`${entry[0]}=${entry[1]}`))
        .join('&\n');
      // requestBody = value.toString();
    }
  }
  try {
    const parsed = JSON.parse(requestBody);
    result = JSON.stringify(parsed ?? '', null, 2);
  } catch (e) {
    // do nothing
  }
  if (!result) {
    result = requestBody;
  }
  return result;
};

let browser = null;
try {
  if (typeof window !== 'undefined' && window.browser) {
    browser = window.browser;
  }
} catch (e) {}
try {
  if (!browser && chrome) {
    browser = chrome;
  }
} catch (e) {}
try {
  // eslint-disable-next-line no-restricted-globals
  if (!browser && self) {
    // probably within service worker, we do not have window there.
    // eslint-disable-next-line no-restricted-globals
    browser = self;
  }
} catch (e) {}

export const changeTabIcon = (tab) => {
  if (tab?.url) {
    serializer.loadStore().then((store) => {
      const domain = store.nodes?.find(({ activeUrls }) =>
        hasUrlMatch(tab?.url, activeUrls),
      );
      if (domain?.isOn) {
        browser?.action &&
          browser.action.setIcon({
            tabId: tab?.id,
            path: '/logo64.png',
          });
      } else {
        browser?.action &&
          browser.action.setIcon({
            tabId: tab?.id,
            path: '/logo-disabled64.png',
          });
      }
    });
  }
};

export const updateLoadedIcon = (tab) => {
  if (!tab) {
    if (browser?.tabs?.query) {
      browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        changeTabIcon(tab);
      });
    }
  } else {
    changeTabIcon(tab);
  }
};

// TODO: such magic shall not appear at all
export const stripMs = (delay) => +(delay + '')?.split('ms')[0];

export const concatenateArrayBuffers = (was, toAdd) => {
  const concatenated = new Uint8Array(was.length + toAdd.length);
  concatenated.set(was, 0);
  concatenated.set(toAdd, was.length);
  return concatenated;
};

export const addArrayBufferResponseValue = (whereToAdd, stringValueToAdd) => {
  const textEncoder = new TextEncoder();
  if (!whereToAdd) {
    return textEncoder.encode(stringValueToAdd).buffer;
  } else {
    const was = new Uint8Array(whereToAdd);
    const toAdd = textEncoder.encode(stringValueToAdd);
    const concatenated = concatenateArrayBuffers(was, toAdd);
    return concatenated.buffer;
  }
};

export const unit8ArrayToBase64 = (bytes) => {
  let binary = '';
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  return unit8ArrayToBase64(bytes);
};

export const blobToBase64 = async (blob) => {
  if (blob && blob instanceof Blob) {
    const buffer = await blob.arrayBuffer();
    return arrayBufferToBase64(buffer);
  }
  return '';
};
