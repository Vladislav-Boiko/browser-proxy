// For more information on what is happening here, read https://xhr.spec.whatwg.org/
const READY_STATES = {
  UNSET: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
};

export default class Overrider {
  // xhr is the real xhr object, proxy is the one
  // encapsulating it and the mock are the data with which we override the response
  constructor(proxy, xhr, mock) {
    this.proxy = proxy;
    this.xhr = xhr;
    this.mock = mock;
  }

  async doOverride(sentBody, state) {
    // TODO: manage reopened requests.
    if (state !== READY_STATES.OPENED) {
      throw new DOMException(
        "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.",
        'INVALID_STATE_ERR',
      );
    }
    const responseBody = this.mock.responseBody;
    //TODO: handle sync requests
    const isAsync = true;
    if (isAsync) {
      this.dispatchProgressEvent(this.xhr, 'loadstart', 0, 0);
      if (sentBody) {
        this.doOverrideSendBody(sentBody);
      }
      this.changeState(READY_STATES.HEADERS_RECEIVED);
      await this.doOverrideReceiveResponse(responseBody);
    } else {
      this.proxy.override.response = this.getTotalResponse(responseBody);
    }
    this.doOverrideEndOfBody(this.getTotalResponse(responseBody));
  }

  doOverrideSendBody(sentBody) {
    this.dispatchProgressEvent(
      this.xhr.upload,
      'loadstart',
      0,
      sentBody?.length || 0,
    );
    this.dispatchProgressEvent(
      this.xhr.upload,
      'progress',
      sentBody?.length || 0,
      sentBody?.length || 0,
    );
    this.dispatchProgressEvent(
      this.xhr.upload,
      'load',
      sentBody?.length || 0,
      sentBody?.length || 0,
    );
    this.dispatchProgressEvent(
      this.xhr.upload,
      'loadend',
      sentBody?.length || 0,
      sentBody?.length || 0,
    );
  }

  async doOverrideReceiveResponse(response) {
    if (response) {
      this.proxy.override.response = '';
      let progress = 0;
      const total = this.getResponseLength(response);
      for (let { value, delay } of response) {
        this.proxy.override.status = this.mock.responseCode || 200;
        this.changeState(READY_STATES.LOADING);
        progress += await this.updateResponse(value, delay, progress, total);
      }
    }
  }

  async updateResponse(value, delay, progress, total) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.proxy.override.response += value;
        this.dispatchProgressEvent(
          this.xhr,
          'progress',
          progress + value.length,
          total,
        );
        resolve(value.length);
      }, delay);
    });
  }

  getResponseLength(responseBody) {
    return responseBody.reduce((acc, { value }) => acc + value.length, 0);
  }

  getTotalResponse(responseBody) {
    return responseBody.reduce((acc, { value }) => acc + value, '');
  }

  doOverrideEndOfBody(response) {
    this.changeState(READY_STATES.DONE);
    this.dispatchProgressEvent(
      this.xhr,
      'load',
      response.length,
      response.length,
    );
    this.dispatchProgressEvent(
      this.xhr,
      'loadend',
      response.length,
      response.length,
    );
  }

  changeState(newState) {
    this.proxy.override.readyState = newState;
    this.xhr.dispatchEvent(new Event('readystatechange'));
  }

  dispatchProgressEvent(where, name, loaded, total) {
    if (where) {
      let payload = {
        loaded,
        total,
      };
      if (total) {
        payload.lengthComputable = true;
      }
      where.dispatchEvent(new ProgressEvent(name, payload));
    }
  }
}
