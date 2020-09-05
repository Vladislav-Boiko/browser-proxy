export const getAllRequests = (store) =>
  Object.values(store.requests)
    .reduce((windowReqeusts, requests) => [...requests, ...windowReqeusts], [])
    .sort((left, right) => left.timestamp - right.timestamp);

export const getRequestsList = (store) => store.requestsList;
export const getOverridesOpen = (store) => store.overridesOpen;
