import { UPDATE_NODE, ADD_DOMAIN } from './actions';
import { evolve, where } from 'immutableql';

const findPath = (id, nodes, path = []) => {
  for (let node of nodes) {
    if (node.id === id) {
      return [...path, id];
    }
    if (node.nodes) {
      return findPath(id, node.nodes, [...path, node.id]);
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
      const pathToNode = findPath(action.payload.id, state);
      return updateDeep(state, pathToNode, action.payload);
    default:
      return state;
  }
};
