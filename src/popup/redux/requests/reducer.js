import { evolve } from "immutableql";
import { LOAD_REQUESTS, TOGGLE_REQUEST } from "./actions";

const initialState = {
  list: {},
  openClosed: {},
};

export default (state = initialState, action) => {
  if (action.type in { LOAD_REQUESTS, TOGGLE_REQUEST }) {
    switch (action.type) {
      case TOGGLE_REQUEST: {
        return evolve(state, {
          openClosed: {
            [action.payload]: {
              isOpen: !state.openClosed?.[action.payload]?.isOpen,
            },
          },
        });
      }
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
