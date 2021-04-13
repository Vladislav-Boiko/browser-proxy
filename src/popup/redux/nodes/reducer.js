import { v4 as uuid } from 'uuid';
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
  IMPORT_DATA,
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

const removeNode = (state, action) => {
  const itemPath = findPath(action.payload, state);
  if (!itemPath) {
    return state;
  }
  const itemId = itemPath.pop();
  return updateDeep(state, itemPath, {
    nodes: alter((key, value) => value.filter(({ id }) => id !== itemId)),
  });
};

const addOverride = (state, action) => {
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

const addDomain = (state, action) => state.concat([action.payload]);

const updateNode = (state, action) =>
  updateDeep(state, findPath(action.payload.id, state), action.payload);

const toggleNode = (state, action) =>
  updateDeep(state, findPath(action.payload, state), {
    isOn: alter((key, value) => !value),
    isFirstOpen: false,
  });

const addFolder = (state, action) => {
  const newFolder = Object.assign(
    {
      name: 'New Folder',
      type: TYPES.FOLDER,
      isOn: true,
    },
    action.payload.folder,
  );
  return updateDeep(state, findPath(action.payload.parentId, state), {
    nodes: alter((key, value) => (value ? [...value, newFolder] : [newFolder])),
  });
};

const removeDomain = (state, action) =>
  state.filter(({ id }) => id !== action.payload);

const moveNode = (state, action) => {
  const fromPath = findPath(action.payload.from, state);
  if (
    fromPath?.length <= 1 ||
    action.payload.from === action.payload.to ||
    !action.payload.from ||
    !action.payload.to
  ) {
    return state;
  }
  let toPath = findPath(action.payload.to, state);
  if (!toPath || !fromPath) {
    return state;
  }
  const moved = getNode(state, fromPath);
  const destinationNode = getNode(state, [...toPath]);
  const afterRemoval = removeNode(state, removeOverride(moved.id));
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
};

const updateIdsInTree = (tree) => {
  if (!tree) {
    return tree;
  }
  for (let node of tree) {
    node.id = uuid();
    if (node?.nodes) {
      node.nodes = updateIdsInTree(node?.nodes);
    }
  }
  return tree;
};

const importData = (state, action) => {
  const { to, data } = action.payload;
  const dataToBeSet = updateIdsInTree(data);
  let toPath = findPath(to, state);
  if (!toPath) {
    return state;
  }
  const toNode = getNode(state, toPath);
  if (toNode.type !== TYPES.FOLDER && toNode.type !== TYPES.DOMAIN) {
    return state;
  }
  return updateDeep(state, toPath, {
    nodes: alter((key, value) => {
      if (!value?.length) {
        return dataToBeSet;
      }
      const additionalNode = {
        type: TYPES.FOLDER,
        name: 'Imported',
        id: uuid(),
        nodes: dataToBeSet,
      };
      return [additionalNode, ...value];
    }),
  });
};

// Returns null if the state shall not be serialized, and state if does.
export const serializedReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_DOMAIN:
      return addDomain(state, action);
    case UPDATE_NODE:
      return updateNode(state, action);
    case TOGGLE_NODE:
      return toggleNode(state, action);
    case ADD_OVERRIDE:
      return addOverride(state, action);
    case ADD_FOLDER:
      return addFolder(state, action);
    case REMOVE_FOLDER:
    case REMOVE_OVERRIDE:
      return removeNode(state, action);
    case REMOVE_DOMAIN:
      return removeDomain(state, action);
    case MOVE_NODE:
      return moveNode(state, action);
    case IMPORT_DATA:
      return importData(state, action);
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
