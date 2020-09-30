import { evolve, where, alter, remove } from "immutableql";
import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM } from "./actions";

// Recusrsive strutcure, each item is { id, name, type, content, path, subNodes: [] }
// root elements have path === [], subItems are stored in sorted Arrays
const initialState = {
  root: [],
};

const setIn = (path, what) => {
  // array.shift is a not pure..
  let pathCopy = [...path];
  if (!pathCopy.length) {
    return what;
  } else {
    const id = pathCopy.shift();
    return { [where({ id })]: { subNodes: setIn(pathCopy, what) } };
  }
};

export default (state = initialState, action) => {
  if (action.type in { UPDATE_ITEM, ADD_ITEM, REMOVE_ITEM }) {
    switch (action.type) {
      case ADD_ITEM: {
        const item = action.payload;
        const modification = setIn(
          item.path,
          alter((key, value) => (value ? [...value, item] : [item]))
        );
        return evolve(state, { root: modification });
      }
      case UPDATE_ITEM: {
        const item = action.payload;
        const modification = setIn([...item.path, item.id], item);
        return evolve(state, { root: modification });
      }
      case REMOVE_ITEM: {
        const item = action.payload;
        const modification = setIn(
          item.path,
          alter((key, value) =>
            value.filter((e) => !!e && e?.id && e?.id !== item.id)
          )
        );
        return evolve(state, { root: modification });
      }
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
