import { evolve } from "immutableql";
import overridesStorage from "../../../common/storage/OverridesStorage";
import foldersStorage from "../../../common/storage/FoldersStorage";
import {
  SERIALIZE_FOLDERS,
  LOAD_FOLDERS,
  SERIALIZE_OVERRIDES,
  LOAD_OVERRIDES,
} from "./actions";

const initialState = {
  root: [],
};

export default (state = initialState, action) => {
  if (
    action.type in
    {
      SERIALIZE_FOLDERS,
      LOAD_FOLDERS,
      SERIALIZE_OVERRIDES,
      LOAD_OVERRIDES,
    }
  ) {
    switch (action.type) {
      case SERIALIZE_FOLDERS: {
        foldersStorage.saveFolders(state.folders);
        return state;
      }
      case SERIALIZE_OVERRIDES: {
        overridesStorage.saveOverrides(state.overrides);
        return state;
      }
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
