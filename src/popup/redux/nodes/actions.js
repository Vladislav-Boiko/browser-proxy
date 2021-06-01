export const ADD_DOMAIN = 'ADD_DOMAIN';
export const addDomain = (payload) => ({
  type: ADD_DOMAIN,
  payload,
});

export const REMOVE_DOMAIN = 'REMOVE_DOMAIN';
export const removeDomain = (payload) => ({
  type: REMOVE_DOMAIN,
  payload,
});

export const UPDATE_NODE = 'UPDATE_NODE';
export const updateNode = (payload) => ({
  type: UPDATE_NODE,
  payload,
});

export const TOGGLE_NODE = 'TOGGLE_NODE';
export const toggleNode = (payload) => {
  // messaging.emit(EVENTS.NODE_TOGGLED);
  return {
    type: TOGGLE_NODE,
    payload,
  };
};

export const ADD_OVERRIDE = 'ADD_OVERRIDE';
export const addOverride = (payload) => ({
  type: ADD_OVERRIDE,
  payload,
});

export const REMOVE_OVERRIDE = 'REMOVE_OVERRIDE';
export const removeOverride = (payload) => ({
  type: REMOVE_OVERRIDE,
  payload,
});

export const ADD_FOLDER = 'ADD_FOLDER';
export const addFolder = (payload) => ({
  type: ADD_FOLDER,
  payload,
});

export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const removeFolder = (payload) => ({
  type: REMOVE_FOLDER,
  payload,
});

export const MOVE_NODE = 'MOVE_NODE';
export const moveNode = (payload) => ({
  type: MOVE_NODE,
  payload,
});

export const DUPLICATE_NODE = 'DUPLICATE_NODE';
export const duplicateNode = (payload) => ({
  type: DUPLICATE_NODE,
  payload,
});

export const IMPORT_DATA = 'IMPORT_DATA';
export const importData = (payload) => ({
  type: IMPORT_DATA,
  payload,
});
