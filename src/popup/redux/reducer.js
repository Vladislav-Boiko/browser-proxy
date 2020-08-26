const initialState = {
  requests: {},
};

export default (state = initialState, action) => {
  const updated = Object.assign({}, state, action.payload);
  console.log("Updated store with ", action, updated);
  return updated;
};
