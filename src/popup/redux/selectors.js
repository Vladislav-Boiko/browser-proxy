export const getAllRequests = (store) =>
  Object.values(store.requests)
    .reduce((windowReqeusts, requests) => [...requests, ...windowReqeusts], [])
    .sort((left, right) => left.timestamp - right.timestamp);

export const getRequestsList = (store) => store.requestsList;
export const getOverridesOpen = (store) => store.overridesOpen;
export const getOverridesList = (store) => store.overrides;
export const getCurrentDomain = (store) => store.tabDomain;
export const getSelectedNavigation = (store) => store.selectedNavigation;
export const getSelectedNavigationType = (store) =>
  store.selectedNavigationType;
export const getSelectedOverride = (store) => {
  // TODO: better way of searching
  for (let forDomain of store.overrides) {
    for (let override of forDomain.overrides) {
      if (override.id === store.selectedNavigation) {
        console.log("Found override: ", override);
        return override;
      }
    }
  }
  return null;
};
