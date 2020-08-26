export const ADD_REQUESTS = "ADD_REQUESTS";

export const addRequests = (requests) => ({
  type: ADD_REQUESTS,
  payload: { requests },
});
