import { v4 as uuid } from 'uuid';

const stripTrailingSlash = (str) =>
  str.endsWith('/') ? str.slice(0, -1) : str;

export const WINDOW_UUID = uuid();
export const DOMAIN = stripTrailingSlash(
  window.location !== window.parent.location
    ? document.location.ancestorOrigins[0]
    : window.location.origin,
);
