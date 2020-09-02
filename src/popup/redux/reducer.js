import { evolve } from "immutableql";
import { TOGGLE_REQUEST } from "./actions";

const initialState = {
  requests: {},
  requestsList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_REQUEST: {
      return evolve(state, {
        requestsList: {
          [action.payload]: {
            isOpen: !state.requestsList?.[action.payload]?.isOpen,
          },
        },
      });
    }
    default:
      return evolve(state, action.payload);
  }
};
