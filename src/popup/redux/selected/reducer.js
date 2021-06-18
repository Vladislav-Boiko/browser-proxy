import { SELECT_NODE, SELECT_CURRENT_DOMAIN, ANALYSE_NODE } from './actions';
import { evolve } from 'immutableql';

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_NODE:
      return evolve(state, { id: action.payload, analysing: '' });
    case SELECT_CURRENT_DOMAIN:
      return evolve(state, { currentDomain: action.payload });
    case ANALYSE_NODE:
      const result = evolve(state, { analysing: action.payload });
      return result;
    default:
      return state;
  }
};
