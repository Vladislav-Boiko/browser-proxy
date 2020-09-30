import { v4 as uuid } from "uuid";
import { NAV_TYPES } from "../utils/constants";
import { addOverride } from "./overrides/actions";
import { selectItem } from "./navigation/actions";
import { addItem } from "./folders/actions";
import { serialize } from "./storage/actions";

export const addNewOverride = (dispatch, override) => {
  const id = uuid();
  const item = { id, path: [override.domain], type: NAV_TYPES.OVERRIDE };
  dispatch(addOverride(id, override));
  dispatch(
    addItem({
      ...item,
      name: override.name || override.url,
      content: id,
    })
  );
  dispatch(selectItem(item));
  dispatch(serialize());
};
