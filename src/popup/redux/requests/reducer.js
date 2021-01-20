import { SET_REQUESTS } from './actions';
import { evolve } from 'immutableql';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_REQUESTS:
      return evolve(state, action.payload);
    default:
      return state;
  }
};
