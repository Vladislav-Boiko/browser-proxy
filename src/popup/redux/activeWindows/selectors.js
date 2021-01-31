import { hasUrlMatch } from 'utils/url';

export const getWindowsForUrl = (wildcardUrl) => (store) => {
  return Object.keys(store.activeWindows)
    .filter((trackedDomain) => hasUrlMatch(trackedDomain, wildcardUrl))
    .map((trackedDomain) => store.activeWindows[trackedDomain])
    .reduce((acc, matchedWindows) => [...acc, ...matchedWindows], []);
};

export const getDomainForActiveUrl = (activeUrl) => (store) =>
  store.nodes?.find(({ activeUrls }) => hasUrlMatch(activeUrl, activeUrls));

export const getDomainIdForActiveUrl = (activeUrl) => (store) =>
  getDomainForActiveUrl(activeUrl)(store)?.id;
