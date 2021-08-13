// is never undefined
let browser;

try {
  if (!browser) {
    browser =
      window?.browser ||
      window?.chrome ||
      this?.browser ||
      this?.chrome;
  }
} catch (e) {
  // maybe we are a service worker
}
/* eslint-disable-next-line no-restricted-globals */
if (self && !browser) {
  /* eslint-disable-next-line no-restricted-globals */
  browser = self?.browser ||
    /* eslint-disable-next-line no-restricted-globals */
    self?.chrome;
}

export default browser ?? {};
