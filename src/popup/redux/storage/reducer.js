import { evolve } from "immutableql";
import serializer from "../../../common/storage/Serializer";
import { SERIALIZE, LOAD_FOLDERS, LOAD_OVERRIDES } from "./actions";

const initialState = {
  root: [],
};

export default (state = initialState, action) => {
  if (
    action.type in
    {
      SERIALIZE,
      LOAD_FOLDERS,
      LOAD_OVERRIDES,
    }
  ) {
    switch (action.type) {
      case SERIALIZE: {
        serializer.serialize({
          folders: state.folders,
          overrides: state.overrides,
        });
        return state;
      }
      default:
        return evolve(state, action.payload);
    }
  }
  return state;
};
