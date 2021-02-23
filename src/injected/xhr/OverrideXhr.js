import { getResponseLength, getTotalResponse } from '../../common/utils';
import XhrUploadProxy from './XhrUploadProxy';

// For more information on what is happening here, read https://xhr.spec.whatwg.org/
const READY_STATES = {
  UNSET: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
};

export default class OverrideXhr {
  isAborted = false;

  constructor(xhrProxy) {
    this.proxy = xhrProxy;
    this.mock = xhrProxy.override;
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
    if (this.proxy.openArguments.async) {
      this.dispatchProgressEvent('loadstart', 0, 0);
      if (sentBody || this.proxy.requestBody) {
        const uploadOverrides = new XhrUploadProxy(this.proxy.realXhr.upload);
        await uploadOverrides.overrideSend(
          this.proxy.requestBody
            ? this.proxy.requestBody
            : [{ value: sentBody, delay: 0 }],
          () => this.proxy.isAborted,
        );
      }
      this.proxy.responseURL = this.mock.responseURL || '';
      this.changeState(READY_STATES.HEADERS_RECEIVED);
      await this.doOverrideReceiveResponse(responseBody);
      this.doOverrideEndOfBody(getTotalResponse(responseBody));
    } else {
      this.proxy.responseURL = this.mock.responseURL || '';
      this.proxy.response = getTotalResponse(responseBody);
      this.proxy.readyState = 4;
      this.proxy.status = this.mock.responseCode || 200;
    }
  }

  async doOverrideReceiveResponse(response) {
    if (response) {
      this.proxy.response = '';
      let progress = 0;
      const total = getResponseLength(response);
      for (let { value, delay } of response) {
        this.proxy.status = this.mock.responseCode || 200;
        this.changeState(READY_STATES.LOADING);
        progress += await this.updateResponse(value, delay, progress, total);
      }
    }
  }

  // TODO: find a way to do a blocking sleep in js without thread burnout.
  async receiveResponseSync(response) {
    if (response) {
      for (let { delay } of response) {
        if (this.proxy.isAborted) {
          throw new DOMException('TODO: text of the abort error.', 'ABORT_ERR');
        }
        //blockingSleep(delay);
      }
    }
    return getTotalResponse(response);
  }

  async updateResponse(value, delay, progress, total) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.proxy.isAborted) {
          this.proxy.response += value;
          this.dispatchProgressEvent(
            'progress',
            progress + value.length,
            total,
          );
          resolve(value.length);
        }
      }, delay);
    });
  }

  doOverrideEndOfBody(response) {
    if (this.proxy.isAborted) {
      return;
    }
    this.changeState(READY_STATES.DONE);
    this.dispatchProgressEvent('load', response.length, response.length);
    this.dispatchProgressEvent('loadend', response.length, response.length);
  }

  changeState(newState) {
    if (this.proxy.isAborted) {
      return;
    }
    this.proxy.readyState = newState;
    this.proxy.dispatchEvent(new Event('readystatechange'));
  }

  dispatchProgressEvent(name, loaded, total) {
    let payload = {
      loaded,
      total,
    };
    if (total) {
      payload.lengthComputable = true;
    }
    this.proxy.dispatchEvent(new ProgressEvent(name, payload));
  }
}
