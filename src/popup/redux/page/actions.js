export const SET_CURRENT_TAB = "SET_CURRENT_TAB";
export const setCurrentTab = (url) => ({
  type: SET_CURRENT_TAB,
  payload: {
    url,
  },
});
