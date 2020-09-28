import { evolve, spread, where, remove } from "immutableql";
import { TOGGLE_REQUEST, SAVE_OVERRIDE, REMOVE_OVERRIDE } from "./actions";
import storage from "../../common/storage/OverridesStorage";
import { getSelectedFolder } from "./selectors";
import { NAV_TYPES } from "../components/Navigation/NavigationTypes";

const initialState = {
  requests: {},
  requestsList: {},
  domains: [],
  overridesOpen: {},
  tabDomain: null,
  selectedNavigation: {
    id: null,
    type: null,
    folder: null,
    folderType: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OVERRIDE: {
      const { id, override } = action.payload;
      const domain = override.domain;
      delete override.domain;
      storage.updateOverride(id, override, domain);
      return evolve(state, {
        domains: {
          [where({ domain })]: {
            overrides: spread([{ id, ...override }]),
          },
        },
        selectedNavigation: {
          id,
          type: NAV_TYPES.OVERRIDE,
          parent: getSelectedFolder(state),
        },
      });
    }
    case REMOVE_OVERRIDE:
      const { id } = action.payload;
      storage.removeOverride(id);
      return evolve(state, {
        domains: {
          [where(true)]: {
            overrides: {
              [where((key, value) => value?.id === id)]: remove(),
            },
          },
        },
        selectedNavigation: getSelectedFolder(state),
      });
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
