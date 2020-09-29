import { evolve, where, spread, remove } from "immutableql";
import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM } from "./actions";

// Recusrsive strutcure, each item is { id, name, type, content, path, subNodes: [] }
// root elements have path === [], subItems are stored in sorted Arrays
const initialState = {
  root: [],
};

const setIn = (path, what) => {
  if (!!path.length) {
    return what;
  } else {
    const id = path.shift();
    return { subNodes: { [where({ id })]: setIn(path, what) } };
  }
};

export default (state = initialState, action) => {
  if (action.type in { UPDATE_ITEM, ADD_ITEM, REMOVE_ITEM }) {
    switch (action.type) {
      case ADD_ITEM: {
        const item = action.payload;
        const modification = setIn(item.path, [spread([item])]);
        return evolve(state, { root: modification });
      }
      case UPDATE_ITEM: {
        const item = action.payload;
        const modification = setIn([...item.path, item.id], item);
        return evolve(state, { root: modification });
      }
      case REMOVE_ITEM: {
        const item = action.payload;
        const modification = setIn([...item.path, item.id], remove());
        return evolve(state, { root: modification });
      }
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
