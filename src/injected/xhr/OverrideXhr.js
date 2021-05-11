import {
  getResponseLength,
  getTotalResponse,
  stripMs,
} from '../../common/utils';
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
      this.proxy.status = +this.mock.responseCode || 200;
    }
  }

  async doOverrideReceiveResponse(response) {
    if (response) {
      this.proxy.response = null;
      let progress = 0;
      const total = getResponseLength(response);
      for (let { value, delay } of response) {
        this.proxy.status = +this.mock.responseCode || 200;
        this.changeState(READY_STATES.LOADING);
        progress += await this.updateResponse(value, delay, progress, total);
      }
      if (this.proxy.responseType === 'JSON') {
        try {
          const asJson = JSON.parse(this.proxy.response);
          this.proxy.response = asJson;
        } catch (e) {
          // Thats correct according to the specification:
          // https://xhr.spec.whatwg.org/#the-response-attribute
          this.proxy.response = null;
        }
      }
    }
  }

  convertOverrideChunkValueToString(stringValue = '') {
    if (this.mock.responseType?.toUpperCase() === 'ARRAYBUFFER') {
      try {
        return atob(stringValue);
      } catch (e) {
        // skip
      }
    }
    return stringValue;
  }

  concatenateArrayBuffers(was, toAdd) {
    const concatenated = new Uint8Array(was.length + toAdd.length);
    concatenated.set(was, 0);
    concatenated.set(toAdd, was.length);
    return concatenated;
  }

  async addResponseValue(stringValueToAdd = '') {
    stringValueToAdd = this.convertOverrideChunkValueToString(stringValueToAdd);
    switch (this.proxy.responseType) {
      case 'arraybuffer':
        this.addArrayBufferResponseValue(stringValueToAdd);
        break;
      case 'blob':
        await this.addBlobResponseValue(stringValueToAdd);
        break;
      case 'text':
      default:
        if (!this.proxy.response) {
          this.proxy.response = '';
        }
        this.proxy.response += stringValueToAdd;
    }
    if (!this.proxy._responseText) {
      this.proxy._responseText = '';
    }
    this.proxy._responseText += stringValueToAdd;
  }

  addArrayBufferResponseValue(stringValueToAdd) {
    const textEncoder = new TextEncoder();
    if (!this.proxy.response) {
      this.proxy.response = textEncoder.encode(stringValueToAdd).buffer;
    } else {
      const was = new Uint8Array(this.proxy.response);
      const toAdd = textEncoder.encode(stringValueToAdd);
      const concatenated = this.concatenateArrayBuffers(was, toAdd);
      this.proxy.response = concatenated.buffer;
    }
  }

  async addBlobResponseValue(stringValueToAdd) {
    const textEncoder = new TextEncoder();
    const mimetype =
      this.proxy.realXhr.getResponseHeader('content-type') || 'text/plain';
    if (!this.proxy.response) {
      const asBlob = new Blob([stringValueToAdd], { type: mimetype });
      this.proxy.response = asBlob;
    } else {
      const was = await this.proxy.response.arrayBuffer();
      const toAdd = textEncoder.encode(stringValueToAdd);
      const concatenated = this.concatenateArrayBuffers(was, toAdd);
      const asBlob = new Blob([concatenated], { type: mimetype });
      this.proxy.response = asBlob;
    }
  }

  // TODO: find a way to do a blocking sleep in js without thread burnout.
  async receiveResponseSync(response) {
    if (response) {
      // for (let { delay } of response) {
      if (this.proxy.isAborted) {
        throw new DOMException('TODO: text of the abort error.', 'ABORT_ERR');
      }
      //blockingSleep(delay);
      // }
    }
    return getTotalResponse(response);
  }

  async updateResponse(value, delay, progress, total) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        if (!this.proxy.isAborted) {
          await this.addResponseValue(value || '');
          this.dispatchProgressEvent(
            'progress',
            progress + value?.length || 0,
            total,
          );
          resolve(value?.length || 0);
        }
      }, stripMs(delay));
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
