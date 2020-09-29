export const SERIALIZE_FOLDERS = "SERIALIZE_FOLDERS";
export const serializeFolders = (payload) => ({
  type: SERIALIZE_FOLDERS,
  payload,
});

export const LOAD_FOLDERS = "LOAD_FOLDERS";
export const loadFolders = (payload) => ({
  type: LOAD_FOLDERS,
  payload,
});

export const SERIALIZE_OVERRIDES = "SERIALIZE_OVERRIDES";
export const serializeOverrides = (payload) => ({
  type: SERIALIZE_OVERRIDES,
  payload,
});

export const LOAD_OVERRIDES = "LOAD_OVERRIDES";
export const loadOverrides = (payload) => ({
  type: LOAD_OVERRIDES,
  payload,
});
