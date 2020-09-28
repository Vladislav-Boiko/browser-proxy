export const getAllRequests = (store) =>
  Object.values(store.requests)
    .reduce((windowReqeusts, requests) => [...requests, ...windowReqeusts], [])
    .sort((left, right) => left.timestamp - right.timestamp);

export const getRequestsList = (store) => store.requestsList;
export const getOverridesOpen = (store) => store.overridesOpen;
export const getOverridesList = (store) => store.overrides;
export const getCurrentDomain = (store) => store.tabDomain;
export const getSelectedNavigation = (store) => store.selectedNavigation.id;
export const getSelectedNavigationType = (store) =>
  store.selectedNavigation.type;
export const getSelectedOverride = (store) => {
  // TODO: better way of searching
  for (let domain of store.overrides) {
    for (let override of domain.overrides) {
      if (override?.id === store.selectedNavigation.id) {
        return override;
      }
    }
  }
  return null;
};

export const getSelectedFolder = (store) =>
  store.selectedNavigation.parent || {
    id: null,
    type: null,
    parent: null,
  };
