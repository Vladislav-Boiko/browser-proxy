import { SET_REQUESTS, UNLOAD_WINDOW } from './actions';
import { updateWindowRequests } from './mappers/request';

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
        .map((windowId) => ({
          windowId,
          requests: updateWindowRequests([], payload[windowId]),
        }));
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
    case UNLOAD_WINDOW:
      let copy = Object.assign({}, state);
      delete copy[action.payload];
      return copy;
    default:
      return state;
  }
};
