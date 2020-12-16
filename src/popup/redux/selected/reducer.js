import { SELECT_NODE } from './actions';
import { evolve } from 'immutableql';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_NODE:
      return evolve(state, { id: action.payload });
    default:
      return state;
  }
};
