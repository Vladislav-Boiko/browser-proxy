import { evolve } from "immutableql";
import { OPEN_OVERRIDE, CLOSE_OVERRIDE } from "./actions";

const initialState = {};

export default (state = initialState, action) => {
  if (action.type in { OPEN_OVERRIDE, CLOSE_OVERRIDE }) {
    switch (action.type) {
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
