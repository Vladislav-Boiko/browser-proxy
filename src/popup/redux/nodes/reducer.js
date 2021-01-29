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
import { findPath, getItemsToSerialize } from './selectors';
import { evolve, where, alter } from 'immutableql';
import { TYPES } from 'organisms/TreeView/Nodes/index';
import serializer from '../../../common/storage/Serializer';

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

// Returns null if the state shall not be serialized, and state if does.
const serializedReducer = (state = [], action) => {
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
        isFirstOpen: false,
      });
    case ADD_OVERRIDE:
      const newOverride = Object.assign(
        {
          name: 'New Override',
          type: 'GET',
          isOn: true,
          isUnsaved: true,
          responseType: 'JSON',
          responseCode: '200',
          responseBody: [{ value: undefined, delay: '200ms' }],
        },
        action.payload.override,
      );
      return updateDeep(state, findPath(action.payload.parentId, state), {
        nodes: alter((key, value) =>
          value ? [...value, newOverride] : [newOverride],
        ),
      });
    case ADD_FOLDER:
      const newFolder = Object.assign(
        {
          name: 'New Folder',
          type: TYPES.FOLDER,
          isOn: true,
        },
        action.payload.folder,
      );
      return updateDeep(state, findPath(action.payload.parentId, state), {
        nodes: alter((key, value) =>
          value ? [...value, newFolder] : [newFolder],
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
      return null;
  }
};

export default (state = [], action) => {
  const updated = serializedReducer(state, action);
  if (updated) {
    const nodes = getItemsToSerialize({ nodes: updated });
    serializer.saveStore(nodes);
    return updated;
  }
  return state;
};
