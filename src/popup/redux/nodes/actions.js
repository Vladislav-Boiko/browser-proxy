export const ADD_DOMAIN = 'ADD_DOMAIN';
export const addDomain = (payload) => ({
  type: ADD_DOMAIN,
  payload,
});

export const UPDATE_NODE = 'UPDATE_NODE';
export const updateNode = (payload) => ({
  type: UPDATE_NODE,
  payload,
});

export const TOGGLE_NODE = 'TOGGLE_NODE';
export const toggleNode = (payload) => ({
  type: TOGGLE_NODE,
  payload,
});
