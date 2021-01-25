import { hasUrlMatch } from 'utils/url';

export const getWindowsForUrl = (wildcardUrl) => (store) => {
  return Object.keys(store.activeWindows)
    .filter((trackedDomain) => hasUrlMatch(trackedDomain, wildcardUrl))
    .map((trackedDomain) => store.activeWindows[trackedDomain])
    .reduce((acc, matchedWindows) => [...acc, ...matchedWindows], []);
};

export const getDomainIdForActiveUrl = (activeUrl) => (store) => {
  return store.nodes?.find(({ activeUrls }) => {
    console.log('Checking: ', activeUrl, activeUrls);
    return hasUrlMatch(activeUrl, activeUrls);
  })?.id;
};
