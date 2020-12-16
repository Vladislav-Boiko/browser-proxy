import {
  UPDATE_NODE,
  ADD_DOMAIN,
  TOGGLE_NODE,
  ADD_OVERRIDE,
  ADD_FOLDER,
  REMOVE_FOLDER,
  REMOVE_OVERRIDE,
  REMOVE_DOMAIN,
} from './actions';
import { findPath } from './selectors';
import { evolve, where, alter } from 'immutableql';

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
    case ADD_OVERRIDE:
    case ADD_FOLDER:
      return updateDeep(state, findPath(action.payload.parentId, state), {
        nodes: alter((key, value) =>
          value
            ? [...value, action.payload.override]
            : [action.payload.override],
        ),
      });
    case REMOVE_FOLDER:
    case REMOVE_OVERRIDE:
      const itemPath = findPath(action.payload, state);
      const itemId = itemPath.pop();
      return updateDeep(state, itemPath, {
        nodes: alter((key, value) => value.filter(({ id }) => id !== itemId)),
      });
    case REMOVE_DOMAIN:
      return state.filter(({ id }) => id !== action.payload);
    default:
      return state;
  }
};
