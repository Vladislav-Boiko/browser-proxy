import { evolve } from "immutableql";
import { SELECT_ITEM } from "./actions";

const initialState = {
  selected: {
    id: null,
    path: [],
  },
};

export default (state = initialState, action) => {
  if (action.type in { SELECT_ITEM }) {
    switch (action.type) {
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
