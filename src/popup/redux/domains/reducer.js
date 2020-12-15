import { ADD_DOMAIN } from './actions';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_DOMAIN:
      return state.concat([action.payload]);
    default:
      return state;
  }
};
