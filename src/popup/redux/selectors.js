export const getAllRequests = (store) =>
  Object.values(store.requests).reduce(
    (windowReqeusts, requests) => [...requests, ...windowReqeusts],
    []
  );
