import { UPDATE_NODE, ADD_DOMAIN, TOGGLE_NODE } from './actions';
import { evolve, where, alter } from 'immutableql';

const findPath = (id, nodes, path = []) => {
  for (let node of nodes) {
    if (node.id === id) {
      return [...path, id];
    }
    if (node.nodes) {
      const found = findPath(id, node.nodes, [...path, node.id]);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const updateDeep = (state, path, payload) => {
  let update = payload;
  do {
    const id = path.pop();
    if (path.length === 0) {
      update = { [where({ id })]: update };
    } else {
      update = { nodes: { [where({ id })]: update } };
    }
  } while (path && path.length);
  return evolve(state, update);
};

export default (state = [], action) => {
  switch (action.type) {
    case ADD_DOMAIN:
      return state.concat([action.payload]);
    case UPDATE_NODE:
      return updateDeep(
        state,
        findPath(action.payload.id, state),
        action.payload,
      );
    case TOGGLE_NODE:
      return updateDeep(state, findPath(action.payload, state), {
        isOn: alter((key, value) => !value),
      });
      return newState;
    default:
      return state;
  }
};
