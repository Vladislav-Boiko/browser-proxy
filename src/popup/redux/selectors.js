export const getAllRequests = (store) =>
  Object.values(store.requests).reduce(
    (windowReqeusts, requests) => [...requests, ...windowReqeusts],
    []
  );
//TODO: actuall time sorting

export const getRequestsList = (store) => store.requestsList;
