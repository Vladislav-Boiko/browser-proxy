import { evolve } from "immutableql";
import { SET_CURRENT_TAB } from "./actions";

const initialState = {
  url: "",
};

export default (state = initialState, action) => {
  if (action.type in { SET_CURRENT_TAB }) {
    switch (action.type) {
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
