import { createStore } from 'redux';
import reducer from './reducer';

export const SET_STATE = 'SET_STATE';
export const setState = (payload) => ({
  type: SET_STATE,
  payload,
});

const rootStateReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_STATE:
      return Object.assign({}, state, action.payload);
    default:
      return reducer(state, action);
  }
};

export default createStore(rootStateReducer);
