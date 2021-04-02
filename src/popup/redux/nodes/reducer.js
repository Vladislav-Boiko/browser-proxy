import {
  UPDATE_NODE,
  ADD_DOMAIN,
  TOGGLE_NODE,
  ADD_OVERRIDE,
  ADD_FOLDER,
  REMOVE_FOLDER,
  REMOVE_OVERRIDE,
  REMOVE_DOMAIN,
  MOVE_NODE,
  removeOverride,
} from './actions';
import { findPath, getItemsToSerialize, getNode } from './selectors';
import { evolve, where, alter } from 'immutableql';
import { TYPES } from 'organisms/TreeView/Nodes/index';
import serializer from '../../../common/storage/Serializer';

export const updateDeep = (state, path, payload) => {
  if (!path) {
    return state;
  }
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

const removeNode = (action, state) => {
  const itemPath = findPath(action.payload, state);
  if (!itemPath) {
    return state;
  }
  const itemId = itemPath.pop();
  return updateDeep(state, itemPath, {
    nodes: alter((key, value) => value.filter(({ id }) => id !== itemId)),
  });
};

const addOverride = (action, state) => {
  let newOverride = Object.assign(
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
  try {
    if (
      newOverride.responseBody?.length === 1 &&
      newOverride.responseBody[0].value
    ) {
      const asJson = JSON.parse(newOverride.responseBody[0].value);
      newOverride.responseBody[0] = Object.assign(
        {},
        newOverride.responseBody[0],
        { value: JSON.stringify(asJson, null, 2) },
      );
    }
  } catch (e) {}
  return updateDeep(state, findPath(action.payload.parentId, state), {
    nodes: alter((key, value) =>
      value ? [newOverride, ...value] : [newOverride],
    ),
  });
};

// Returns null if the state shall not be serialized, and state if does.
export const serializedReducer = (state = [], action) => {
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
      return addOverride(action, state);
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
      return removeNode(action, state);
    case REMOVE_DOMAIN:
      return state.filter(({ id }) => id !== action.payload);
    case MOVE_NODE:
      const fromPath = findPath(action.payload.from, state);
      let toPath = findPath(action.payload.to, state);
      if (!toPath || !fromPath) {
        return state;
      }
      const moved = getNode(state, fromPath);
      const destinationNode = getNode(state, [...toPath]);
      const afterRemoval = removeNode(removeOverride(moved.id), state);
      if (destinationNode?.type === TYPES.FOLDER) {
        return updateDeep(afterRemoval, toPath, {
          nodes: alter((key, value) => (value ? [moved, ...value] : [moved])),
        });
      }
      const neighborId = toPath.pop();
      if (!toPath.length) {
        return updateDeep(afterRemoval, [neighborId], {
          nodes: alter((key, value) => (value ? [moved, ...value] : [moved])),
        });
      }
      return updateDeep(afterRemoval, toPath, {
        nodes: alter((key, value) => {
          const neighborIndex = value.findIndex(({ id }) => id === neighborId);
          let valueCopy = [...value];
          valueCopy.splice(neighborIndex + 1, 0, moved);
          return valueCopy.filter((item) => !!item);
        }),
      });
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
