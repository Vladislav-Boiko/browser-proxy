export const SELECT_ITEM = "SELECT_ITEM";
export const selectItem = (selected) => ({
  type: SELECT_ITEM,
  payload: {
    selected,
  },
});
