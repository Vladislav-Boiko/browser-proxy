import { getWindowsForUrl } from 'store/activeWindows/selectors';

export const getAllRequests = (store) =>
  flattenRequests(Object.values(store.requests));

export const getRequestsForActiveUrls = (activeUrls) => (store) => {
  if (!activeUrls || activeUrls.length === 0) {
    return [];
  }
  // console.log('Want to get requests for urls ', activeUrls);
  // console.log(
  //   'The windows for this urls are: ',
  //   activeUrls
  //     .map((url) => getWindowsForUrl(url)(store))
  //     .reduce((acc, windowIds) => [...acc, ...windowIds], []),
  // );
  // console.log('the registered windows are: ', store.activeWindows);
  return flattenRequests(
    activeUrls
      .map((url) => getWindowsForUrl(url)(store))
      .reduce((acc, windowIds) => [...acc, ...windowIds], [])
      .map((windowId) => store.requests[windowId] || []),
  );
};

const flattenRequests = (requestsSelection) => {
  return requestsSelection.reduce((acc, items) => [...acc, ...items], []);
};
