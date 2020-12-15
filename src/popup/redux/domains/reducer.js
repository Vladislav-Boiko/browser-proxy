import { evolve, where, alter, remove } from 'immutableql';
import { ADD_DOMAIN } from './actions';

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOMAIN:
      return evolve(state, {
        domains: alter((key, value) => value.push(action.payload)),
      });
    default:
      return state;
  }
};
