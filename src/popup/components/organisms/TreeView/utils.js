export const bringCurrentDomainToTop = (nodes, currentDomain) => {
  if (!currentDomain) {
    return nodes;
  }
  const nodesCopy = Object.assign([], nodes);
  const domain = nodesCopy.find(({ id }) => id === currentDomain);
  let filtered = nodesCopy.filter(({ id }) => id !== currentDomain);
  filtered.unshift(domain);
  return filtered;
};
