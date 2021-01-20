export const getAllRequests = (store) => {
  return Object.values(store.requests)
    .reduce((acc, items) => [...acc, ...items], [])
    .map((request) => ({
      ...request,
      code: request.status,
    }));
};
