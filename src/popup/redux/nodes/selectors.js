export const getAllNodes = (store) => store.nodes;

export const findPath = (id, nodes, path = []) => {
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

export const getParentId = (id) => (store) => {
  const nodes = getAllNodes(store);
  const pathToItem = findPath(id, nodes);
  pathToItem.pop();
  return pathToItem.pop();
};
