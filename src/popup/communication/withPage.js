import messaging from "./PluginMessaging";
import EVENTS from "../../common/communication/events";
import store from "../redux/store";
import { addRequests } from "../redux/actions";

messaging.subscribe(EVENTS.REQUESTS_UPDATED, (reqeusts) =>
  store.dispatch(addRequests(reqeusts))
);

messaging.emit(EVENTS.ASK_REQUESTS);
