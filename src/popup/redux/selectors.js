// sorts the requests by timestamp
export const getAllRequests = (store) =>
  Object.values(store.requests.list)
    .reduce((windowReqeusts, requests) => [...requests, ...windowReqeusts], [])
    .sort((left, right) => left.timestamp - right.timestamp);
export const getRequestsList = (store) => store.requests.openClosed;

export const getSelectedNavigation = (store) => store.navigation.selected.id;
export const getSelectedNavigationType = (store) =>
  store.navigation.selected.type;

export const getInlineOverrides = (store) => store.inlineOverrides;
export const getCurrentDomain = (store) => store.page.url;

export const getFolders = (store) => store.folders;

export const getSelectedOverride = (store) => {
  const currentId = getSelectedNavigation(store);
  return store.overrides.find((override) => override.id === currentId);
};
