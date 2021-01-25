import { SET_REQUESTS } from './actions';

const updateWindowRequests = (oldWindowRequests, updateRequests) => {
  // Update requests that are already present in state
  const updated = oldWindowRequests.map((request) => {
    const anUpdate = updateRequests.find(({ id }) => id === request.id);
    if (anUpdate) {
      return { ...request, ...anUpdate };
    }
    return request;
  });
  // Add requests that are not yet present in state
  const newRequests = updateRequests.filter(
    ({ id }) =>
      !oldWindowRequests.find((existingRequest) => existingRequest.id === id),
  );
  return [...updated, ...newRequests];
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_REQUESTS:
      const payload = action.payload;
      const updated = Object.keys(payload)
        .filter((windowId) => windowId in state)
        .map((windowId) => ({
          windowId,
          requests: updateWindowRequests(state[windowId], payload[windowId]),
        }));
      const newWindows = Object.keys(payload)
        .filter((windowId) => !(windowId in state))
        .map((windowId) => ({ windowId, requests: payload[windowId] }));
      const unchanged = Object.keys(state)
        .filter((windowId) => !(windowId in payload))
        .map((windowId) => ({ windowId, requests: state[windowId] }));
      return [...unchanged, ...updated, ...newWindows].reduce(
        (acc, { windowId, requests }) => {
          acc[windowId] = requests;
          return acc;
        },
        {},
      );
    default:
      return state;
  }
};
