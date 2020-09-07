import { evolve } from "immutableql";
import { TOGGLE_REQUEST, SAVE_OVERRIDE } from "./actions";
import storage from "../../common/storage/OverridesStorage";

const initialState = {
  requests: {},
  requestsList: {},
  overrides: {},
  overridesOpen: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OVERRIDE: {
      const { id, payload } = action.payload;
      const domain = payload.domain;
      delete payload.domain;
      storage.update(id, payload, domain);
      return evolve(state, { overrides: { id: payload } });
    }
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
