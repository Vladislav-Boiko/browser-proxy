import navigation from "./navigation/reducer";
import overrides from "./overrides/reducer";
import requests from "./requests/reducer";
import folders from "./folders/reducer";
import storage from "./storage/reducer";
import inlineOVerrides from "./inlineOVerrides/reducer";
import page from "./page/reducer";
import root from "./root";

const combineReducersWithRoot = (rootReducer, reducers) => (
  state = {},
  action
) => {
  let newState = state;
  console.log(newState, reducers);
  for (let key in reducers) {
    newState[key] = reducers[key](state[key], action);
    console.log(
      `after applying reducer ${key} with action ${action.type} got:`,
      newState
    );
  }
  newState = rootReducer(newState, action);
  newState = storage(newState, action);
  return newState;
};

export default combineReducersWithRoot(root, {
  navigation,
  overrides,
  requests,
  folders,
  inlineOVerrides,
  page,
});
