import messaging from '../../common/communication/injected/ProxyMessaging';
import EVENTS from '../../common/communication/injected/events';

const getBaseUrl = (url = '') => {
  const splitted = url.split('?');
  if (splitted.length > 1) {
    splitted.pop();
  }
  return splitted.join('');
};

class Overrides {
  overrides = {};

  startListening() {
    messaging.emit(EVENTS.REQUEST_OVERRIDES_UPDATE, {});
    messaging.subscribe(
      EVENTS.OVERRIDES_UPDATED,
      (overrides) => (this.overrides = overrides),
    );
  }

  findOverride(request) {
    // TODO: actual implementation
    const url = getBaseUrl(request?.url);
    const result = Object.values(this.overrides).find(
      (override) => getBaseUrl(override.url) === url,
    );
    if (result) {
      return {
        status: result.status || 200,
        response: result.response,
      };
    }
    return false;
  }
}

export default new Overrides();
