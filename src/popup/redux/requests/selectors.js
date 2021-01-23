import { getWindowsForUrl } from 'store/activeWindows/selectors';

export const getAllRequests = (store) =>
  flattenRequests(Object.values(store.requests));

export const getRequestsForActiveUrls = (activeUrls) => (store) => {
  if (!activeUrls || activeUrls.length === 0) {
    return [];
  }
  return flattenRequests(
    activeUrls
      .map((url) => getWindowsForUrl(url)(store))
      .reduce((acc, windowIds) => [...acc, windowIds], [])
      .map((windowId) => store.requests[windowId]),
  );
};

const flattenRequests = (requestsSelection) =>
  requestsSelection
    .reduce((acc, items) => [...acc, ...items], [])
    .map((request) => ({
      ...request,
      code: request.status,
    }));
