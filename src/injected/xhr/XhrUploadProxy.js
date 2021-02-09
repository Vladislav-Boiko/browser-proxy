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

  overrideSend(sentBody) {
    this.shallOverride = true;
    this.removeListenersFromRealXhr();
    if (!sentBody || !sentBody.length) {
      return;
    }
    this.overrideProgressEvent('loadstart', 0, sentBody?.length || 0);
    this.overrideProgressEvent(
      'progress',
      sentBody?.length || 0,
      sentBody?.length || 0,
    );
    this.overrideProgressEvent(
      'load',
      sentBody?.length || 0,
      sentBody?.length || 0,
    );
    this.overrideProgressEvent(
      'loadend',
      sentBody?.length || 0,
      sentBody?.length || 0,
    );
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
