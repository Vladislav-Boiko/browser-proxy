import { evolve, spread } from "immutableql";
import { TOGGLE_REQUEST, SAVE_OVERRIDE } from "./actions";
import storage from "../../common/storage/OverridesStorage";

const initialState = {
  requests: {},
  requestsList: {},
  overrides: [],
  overridesOpen: {},
  tabDomain: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OVERRIDE: {
      const { id, override } = action.payload;
      const domain = override.domain;
      delete override.domain;
      storage.updateOverride(id, override, domain);
      return evolve(state, { overrides: [spread(override)] });
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
