import { evolve } from 'immutableql';
import navigation from './navigation/reducer';
import overrides from './overrides/reducer';
import requests from './requests/reducer';
import folders from './folders/reducer';
import storage from './storage/reducer';
import inlineOverrides from './inlineOverrides/reducer';
import page from './page/reducer';

const combineReducersWithStorage = (reducers) => (state = {}, action) => {
  let newState = evolve(state);
  for (let key in reducers) {
    newState[key] = reducers[key](state[key], action);
  }
  newState = storage(newState, action);
  console.log(
    `after applying reducers with action ${action.type} got:`,
    newState,
  );
  return newState;
};

export default combineReducersWithStorage({
  navigation,
  overrides,
  requests,
  folders,
  inlineOverrides,
  page,
});
