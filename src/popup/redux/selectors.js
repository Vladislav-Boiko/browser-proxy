// sorts the requests by timestamp
export const getAllRequests = (store) =>
  Object.values(store.requests.list)
    .reduce((windowReqeusts, requests) => [...requests, ...windowReqeusts], [])
    .sort((left, right) => left.timestamp - right.timestamp);
export const getOpenClosedRequests = (store) => store.requests.openClosed;

export const getSelectedNavigation = (store) => store.navigation.selected.id;
export const getSelectedNavigationType = (store) => {
  let path = store.navigation.selected.path;
  let selectedId = store.navigation.selected.id;
  let iterator = store.folders.root;
  while (path.length && iterator) {
    let id = path.shift();
    console.log("Step, ", { id, iterator });
    iterator = iterator.find((subNode) => subNode.id === id)?.subNodes;
  }
  return iterator?.find((item) => item.id === selectedId)?.type;
};

export const getInlineOverrides = (store) => store.inlineOverrides;
export const getCurrentDomain = (store) => store.page.url;

export const getFolders = (store) => store.folders;

export const getSelectedOverride = (store) => {
  const currentId = getSelectedNavigation(store);
  return store.overrides.list.find((override) => override?.id === currentId);
};
