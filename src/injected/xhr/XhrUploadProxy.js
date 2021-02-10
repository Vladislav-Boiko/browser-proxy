export default class XhrUploadProxy extends EventTarget {
  shallOverride = false;
  passThroughListeners = [];
  constructor(realXhrUpload) {
    super();
    this.realXhrUpload = realXhrUpload;
    [
      'loadstart',
      'progress',
      'abort',
      'error',
      'load',
      'timeout',
      'loadend',
    ].forEach((name) => this.overrideProgressEvent(name));
  }

  overrideProgressEvent(name) {
    const listener = {
      name,
      callback: ({ loaded, total }) => {
        !this.shallOverride && this.dispatchEvent(name, loaded, total);
      },
    };
    this.realXhrUpload.addEventListener(name, listener.callback);
    this.passThroughListeners.push(listener);
  }

  getFullValue(requestBody) {
    return requestBody?.reduce((acc, { value }) => acc + value, '') || '';
  }

  async overrideSend(requestBody, isAborted) {
    this.shallOverride = true;
    this.removeListenersFromRealXhr();
    if (!requestBody || !requestBody.length) {
      return;
    }
    const fullValue = this.getFullValue(requestBody);
    const total = fullValue?.length || 0;
    this.overrideProgressEvent('loadstart', 0, total);
    let progress = 0;
    for (let { value, delay } of requestBody) {
      if (isAborted()) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      progress += value.length;
      this.overrideProgressEvent('progress', progress || 0, total);
    }
    this.overrideProgressEvent('load', total, total);
    this.overrideProgressEvent('loadend', total, total);
  }

  removeListenersFromRealXhr() {
    while (this.passThroughListeners.length) {
      const listener = this.passThroughListeners.pop();
      this.realXhrUpload.removeEventListener(listener.name, listener.callback);
    }
  }

  overrideProgressEvent(name, loaded, total) {
    this.dispatchProgressEvent('on' + name, loaded, total);
    const payload = this.getProgressPayload(loaded, total);
    const event = new ProgressEvent(name, payload);
    if (this[name] && typeof this[name] === 'function') {
      this[name](event);
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
