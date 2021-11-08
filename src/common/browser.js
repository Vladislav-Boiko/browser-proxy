// is never undefined
let browser;

try {
  if (!browser) {
    if (typeof window !== 'undefined') {
      browser = window?.browser || window?.chrome;
    }
    if (!browser) {
      browser = this?.browser || this?.chrome;
    }
  }
} catch (e) {
  // maybe we are a service worker
}
/* eslint-disable-next-line no-restricted-globals */
if (!browser && typeof self !== 'undefined' && self) {
  browser =
    /* eslint-disable-next-line no-restricted-globals */
    self?.browser ||
    /* eslint-disable-next-line no-restricted-globals */
    self?.chrome;
}

export default browser ?? {};
