import messaging from './PluginMessaging';
import EVENTS from '../../common/communication/plugin/events';
import store from 'store/store';
import { setRequests } from 'store/requests/actions';
import { windowLoad } from 'store/activeWindows/actions';

export const startMessaging = () => {
  messaging.subscribe(
    [EVENTS.REQUESTS_UPDATED, EVENTS.WINDOW_UNLOAD],
    (requests) => {
      store.dispatch(setRequests(requests));
    },
  );

  messaging.subscribe([EVENTS.WINDOW_LOAD], (windowToDomain) => {
    store.dispatch(windowLoad(windowToDomain));
  });

  messaging.emit(EVENTS.PLUGIN_LOAD);
};
