export const SERIALIZE = "SERIALIZE";
export const serialize = (payload) => ({
  type: SERIALIZE,
  payload,
});

export const LOAD_FOLDERS = "LOAD_FOLDERS";
export const loadFolders = (folders) => ({
  type: LOAD_FOLDERS,
  payload: { folders },
});

export const LOAD_OVERRIDES = "LOAD_OVERRIDES";
export const loadOverrides = (overrides) => ({
  type: LOAD_OVERRIDES,
  payload: { overrides },
});
