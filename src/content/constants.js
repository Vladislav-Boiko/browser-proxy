import browser from 'src/common/browser';
import { v4 as uuid } from 'uuid';

const stripTrailingSlash = (str) =>
  str.endsWith('/') ? str.slice(0, -1) : str;

export const WINDOW_UUID = uuid();
export const DOMAIN = stripTrailingSlash(
  browser.location !== browser.parent.location
    ? document.location.ancestorOrigins[0]
    : browser.location.origin,
);
