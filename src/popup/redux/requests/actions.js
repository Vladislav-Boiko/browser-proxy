export const LOAD_REQUESTS = "LOAD_REQUESTS";
export const addRequests = (list) => ({
  type: LOAD_REQUESTS,
  payload: { list },
});

export const TOGGLE_REQUEST = "TOGGLE_REQUEST";
export const toggleRequest = (id) => ({
  type: TOGGLE_REQUEST,
  payload: id,
});
