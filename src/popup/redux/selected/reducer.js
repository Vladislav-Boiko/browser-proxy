import { SELECT_NODE, SELECT_CURRENT_DOMAIN } from './actions';
import { evolve } from 'immutableql';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_NODE:
      return evolve(state, { id: action.payload });
    case SELECT_CURRENT_DOMAIN:
      return evolve(state, { currentDomain: action.payload });
    default:
      return state;
  }
};
