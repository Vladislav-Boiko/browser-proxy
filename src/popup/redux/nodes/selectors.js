import { TYPES } from 'organisms/TreeView/Nodes/index';

export const getAllNodes = (store) => store.nodes;

export const findPath = (id, nodes, path = []) => {
  for (let node of nodes) {
    if (node?.id === id) {
      return [...path, id];
    }
    if (node.nodes) {
      const found = findPath(id, node.nodes, [...path, node?.id]);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const getParentId = (id) => (store) => {
  const nodes = getAllNodes(store);
  const pathToItem = findPath(id, nodes);
  pathToItem.pop();
  return pathToItem.pop();
};

const filterUnsavedNodesRecursively = (nodes = []) => {
  return nodes
    .filter((node) => node.isUnsaved !== true || node.type === TYPES.DOMAIN)
    .map((node) => {
      if (node.nodes) {
        return {
          ...node,
          nodes: filterUnsavedNodesRecursively(node.nodes),
        };
      }
      return node;
    });
};

export const getItemsToSerialize = (store) => {
  let nodes = store.nodes;
  // filter out unsaved domains
  nodes = nodes.filter(({ isFirstOpen }) => isFirstOpen !== true);
  // filter out all unsaved nodes
  nodes = filterUnsavedNodesRecursively(nodes);
  return { nodes };
};
