export const ADD_OVERRIDE = "ADD_OVERRIDE";
export const addOverride = (id, override) => ({
  type: ADD_OVERRIDE,
  payload: {
    id,
    override,
  },
});

export const UPDATE_OVERRIDE = "UPDATE_OVERRIDE";
export const updateOverride = (id, override) => ({
  type: UPDATE_OVERRIDE,
  payload: {
    id,
    override,
  },
});

export const REMOVE_OVERRIDE = "REMOVE_OVERRIDE";
export const removeOverride = (id) => ({
  type: REMOVE_OVERRIDE,
  payload: {
    id,
  },
});
