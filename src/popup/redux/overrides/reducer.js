import { evolve, where, remove, alter } from "immutableql";
import { ADD_OVERRIDE, REMOVE_OVERRIDE, UPDATE_OVERRIDE } from "./actions";

const initialState = {
  list: [],
};

export default (state = initialState, action) => {
  if (action.type in { ADD_OVERRIDE, REMOVE_OVERRIDE, UPDATE_OVERRIDE }) {
    switch (action.type) {
      case ADD_OVERRIDE: {
        const { id, override } = action.payload;
        return evolve(state, {
          list: alter((key, value) =>
            value ? [...value, { id, ...override }] : [{ id, ...override }]
          ),
        });
      }
      case UPDATE_OVERRIDE: {
        const { id, override } = action.payload;
        return evolve(state, {
          list: {
            [where({ id })]: { id, ...override },
          },
        });
      }
      case REMOVE_OVERRIDE:
        const { id } = action.payload;
        return evolve(state, {
          list: {
            [where({ id })]: remove(),
          },
        });
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
