export const ADD_REQUESTS = "ADD_REQUESTS";
export const addRequests = (requests) => ({
  type: ADD_REQUESTS,
  payload: { requests },
});

export const TOGGLE_REQUEST = "TOGGLE_REQUEST";
export const toggleRequest = (id) => ({
  type: TOGGLE_REQUEST,
  payload: id,
});
