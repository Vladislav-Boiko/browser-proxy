export const WINDOW_LOAD = 'WINDOW_LOAD';
export const windowLoad = (payload) => ({
  type: WINDOW_LOAD,
  payload,
});

export const WINDOW_UNLOAD = 'WINDOW_UNLOAD';
export const windowUnload = (payload) => ({
  type: WINDOW_UNLOAD,
  payload,
});
