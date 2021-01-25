export const SET_REQUESTS = 'SET_REQUESTS';
export const setRequests = (payload) => ({
  type: SET_REQUESTS,
  payload,
});

export const UNLOAD_WINDOW = 'UNLOAD_WINDOW';
export const unloadWindow = (windowId) => ({
  type: UNLOAD_WINDOW,
  payload: windowId,
});
