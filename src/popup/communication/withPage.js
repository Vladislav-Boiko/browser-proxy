import messaging from "./PluginMessaging";
import EVENTS from "../../common/communication/plugin/events";
import store from "../redux/store";
import { addRequests } from "../redux/requests/actions";

export const startMessaging = () => {
  messaging.subscribe(
    [EVENTS.REQUESTS_UPDATED, EVENTS.UNLOAD_WINDOW],
    (reqeusts) => store.dispatch(addRequests(reqeusts))
  );

  messaging.emit(EVENTS.ASK_REQUESTS);
};
