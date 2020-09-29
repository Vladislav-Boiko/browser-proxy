import { evolve } from "immutableql";
import { SELECT_ITEM } from "./actions";

const initialState = {
  selected: {
    id: null,
    name: "",
    type: null,
    content: null,
    path: [],
    subNodes: [],
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
