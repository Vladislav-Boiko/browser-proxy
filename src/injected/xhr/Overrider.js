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

  doOverride(sentBody, state) {
    // TODO: manage reopened requests.
    if (state !== READY_STATES.OPENED) {
      throw new DOMException(
        "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.",
        "INVALID_STATE_ERR"
      );
    }
    //TODO: handle sync requests
    const isAsync = true;
    if (isAsync) {
      this.dispatchProgressEvent(this.xhr, "loadstart", 0, 0);
      if (sentBody) {
        this.doOverrideSendBody(sentBody);
      }
      this.changeState(READY_STATES.HEADERS_RECEIVED);
      this.doOverrideReceiveResponse(this.mock.response);
    } else {
      this.proxy.override.response = this.mock.response;
    }
    this.doOverrideEndOfBody(this.mock.response);
  }

  doOverrideSendBody(sentBody) {
    this.dispatchProgressEvent(
      this.xhr.upload,
      "loadstart",
      0,
      sentBody.length
    );
    this.dispatchProgressEvent(
      this.xhr.upload,
      "progress",
      sentBody.length,
      sentBody.length
    );
    this.dispatchProgressEvent(
      this.xhr.upload,
      "load",
      sentBody.length,
      sentBody.length
    );
    this.dispatchProgressEvent(
      this.xhr.upload,
      "loadend",
      sentBody.length,
      sentBody.length
    );
  }

  doOverrideReceiveResponse(response) {
    if (response) {
      this.changeState(READY_STATES.LOADING);
      //TODO: manage chunked responses
      this.proxy.override.response = response;
      this.dispatchProgressEvent(
        this.xhr,
        "progress",
        response.length,
        response.length
      );
    }
  }

  doOverrideEndOfBody(response) {
    this.changeState(READY_STATES.DONE);
    this.dispatchProgressEvent(
      this.xhr,
      "load",
      response.length,
      response.length
    );
    this.dispatchProgressEvent(
      this.xhr,
      "loadend",
      response.length,
      response.length
    );
  }

  changeState(newState) {
    this.proxy.override.readyState = newState;
    this.xhr.dispatchEvent(new Event("readystatechange"));
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
