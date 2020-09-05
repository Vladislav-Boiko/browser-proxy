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

export const OPEN_OVERRIDE = "OPEN_OVERRIDE";
export const openOverride = (id) => ({
  type: OPEN_OVERRIDE,
  payload: { overridesOpen: { [id]: true } },
});

export const CLOSE_OVERRIDE = "CLOSE_OVERRIDE";
export const closeOverride = (id) => ({
  type: CLOSE_OVERRIDE,
  payload: { overridesOpen: { [id]: false } },
});

export const SAVE_OVERRIDE = "SAVE_OVERRIDE";
export const saveOverride = (id, payload) => ({
  type: SAVE_OVERRIDE,
  payload: {
    overrides: {
      [id]: payload,
    },
  },
});
