import { getAllNodes } from '../nodes/selectors';

export const getSelectedNodeID = (store) => store.selected.id;

const findSelectedById = (id, nodes = []) => {
  for (let node of nodes) {
    if (node.id === id) {
      return node;
    }
    if (node.nodes) {
      const maybeFound = findSelectedById(id, node.nodes);
      if (maybeFound) {
        return maybeFound;
      }
    }
  }
  return null;
};

export const getSelectedNode = (store) =>
  findSelectedById(getSelectedNodeID(store), getAllNodes(store));