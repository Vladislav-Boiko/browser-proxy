export const LOAD_REQUESTS = "LOAD_REQUESTS";
export const addRequests = (requests) => ({
  type: LOAD_REQUESTS,
  payload: { requests },
});

export const TOGGLE_REQUEST = "TOGGLE_REQUEST";
export const toggleRequest = (id) => ({
  type: TOGGLE_REQUEST,
  payload: id,
});
