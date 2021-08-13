import messaging from './PluginMessaging';
import EVENTS from '../../common/communication/plugin/events';
import store from 'store/store';
import { setRequests, unloadWindow } from 'store/requests/actions';
import { windowLoad, windowUnload } from 'store/activeWindows/actions';
import serializer from '../../common/storage/Serializer.js';

export const startMessaging = () => {
  messaging.subscribe([EVENTS.WINDOW_LOAD], (windowToDomain) => {
    store.dispatch(windowLoad(windowToDomain));
  });

  messaging.subscribe([EVENTS.REQUESTS_UPDATED], (requests) => {
    store.dispatch(setRequests(requests));
  });

  messaging.subscribe([EVENTS.WINDOW_UNLOAD], (windowId) => {
    store.dispatch(unloadWindow(windowId));
    store.dispatch(windowUnload(windowId));
  });

  messaging.subscribe([EVENTS.REQUEST_OVERRIDES_UPDATE], async () => {
    const store = await serializer.loadStore();
    const overrides = store?.nodes;
    messaging.emit(EVENTS.OVERRIDES_UPDATED, overrides);
  });
  messaging.emit(EVENTS.PLUGIN_LOAD);
};
