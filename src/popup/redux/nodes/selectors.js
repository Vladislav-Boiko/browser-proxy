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
  return pathToItem.pop() || null;
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

export const getNode = (state, path) => {
  if (!path && !Array.isArray(path)) {
    return null;
  }
  const pathCopy = [...path];
  let current = { nodes: state };
  do {
    const id = pathCopy.shift();
    if (!id) {
      return null;
    }
    current = current.nodes.find((item) => item.id === id);
    if (!current) {
      return null;
    }
  } while (pathCopy && pathCopy.length);
  return Object.assign({}, current);
};

export const getNodeForExport = (id) => (store) => {
  const nodes = getAllNodes(store);
  const pathToItem = findPath(id, nodes);
  return getNode(nodes, pathToItem);
};
