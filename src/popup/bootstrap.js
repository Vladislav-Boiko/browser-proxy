import { startMessaging } from "./communication/withPage";
import storage from "../common/storage/OverridesStorage";
import store from "./redux/store";
import { loadOverrides } from "./redux/actions";

const bootstrapOverrides = async () => {
  const overrides = storage.getAll();
  store.dispatch(loadOverrides(overrides));
};

export default () => {
  startMessaging();
  bootstrapOverrides();
};
