import messaging from './PluginMessaging';
import EVENTS from '../../common/communication/plugin/events';
import store from 'store/store';
import { setRequests } from 'store/requests/actions';

export const startMessaging = () => {
  messaging.subscribe(
    [EVENTS.REQUESTS_UPDATED, EVENTS.UNLOAD_WINDOW],
    (requests) => {
      store.dispatch(setRequests(requests));
      console.log('Got event: ', requests);
    },
  );

  messaging.emit(EVENTS.ASK_REQUESTS);
};
