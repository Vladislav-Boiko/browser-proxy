export const OPEN_OVERRIDE = "OPEN_OVERRIDE";
export const openOverride = (id) => ({
  type: OPEN_OVERRIDE,
  payload: { [id]: true },
});

export const CLOSE_OVERRIDE = "CLOSE_OVERRIDE";
export const closeOverride = (id) => ({
  type: CLOSE_OVERRIDE,
  payload: { [id]: false },
});
