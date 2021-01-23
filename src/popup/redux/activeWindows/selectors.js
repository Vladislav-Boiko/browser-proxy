import { hasUrlMatch } from 'utils/url';

export const getWindowsForUrl = (wildcardUrl) => (store) =>
  Object.keys(store.activeWindows)
    .filter((trackedDomain) => hasUrlMatch(trackedDomain, wildcardUrl))
    .map((trackedDomain) => store.activeWindows[trackedDomain])
    .reduce((acc, matchedWindows) => [...acc, matchedWindows], []);
