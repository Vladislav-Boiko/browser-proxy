import { getTotalResponse, stripMs } from '../../common/utils';

export default class XhrUploadProxy extends EventTarget {
  shallOverride = false;
  passThroughListeners = [];
  constructor(realXhrUpload) {
    super();
    this.realXhrUpload = realXhrUpload;
  }

  async overrideSend(requestBody, isAborted) {
    this.shallOverride = true;
    // this.removeListenersFromRealXhr();
    if (!requestBody || !requestBody.length) {
      return;
    }
    const fullValue = getTotalResponse(requestBody);
    const total = fullValue?.length || 0;
    this.overrideProgressEvent('loadstart', 0, total);
    let progress = 0;
    for (let { value, delay } of requestBody) {
      if (isAborted()) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, stripMs(delay)));
      progress += value.length;
      this.overrideProgressEvent('progress', progress || 0, total);
    }
    this.overrideProgressEvent('load', total, total);
    this.overrideProgressEvent('loadend', total, total);
  }

  overrideProgressEvent(name, loaded, total) {
    const payload = this.getProgressPayload(loaded, total);
    const event = new ProgressEvent('on' + name, payload);
    this.realXhrUpload.dispatchEvent(event);
    if (
      this.realXhrUpload[name] &&
      typeof this.realXhrUpload[name] === 'function'
    ) {
      this.realXhrUpload[name](event);
    }
  }

  dispatchProgressEvent(name, loaded, total) {
    const payload = this.getProgressPayload(loaded, total);
    const event = new ProgressEvent(name, payload);
    this.dispatchEvent(event);
  }

  getProgressPayload(loaded, total) {
    let payload = {
      loaded,
      total,
    };
    if (total) {
      payload.lengthComputable = true;
    }
    return payload;
  }
}
