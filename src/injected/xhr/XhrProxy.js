import { trackXhr } from './TrackXhr';
import overridesStorage from '../overrides/Overrides';
import OverrideXhr from './OverrideXhr';
import { HTTP_STATUS_CODES } from 'utils/constants';

const proxyFunction = (func, replacement) =>
  new Proxy(func, {
    apply(target, thisArg, argumentsList) {
      return replacement(argumentsList, () =>
        Reflect.apply(target, thisArg, argumentsList),
      );
    },
  });

export default class XhrProxy {
  openArguments = {};
  requestHeaders = [];
  override = null;

  constructor(realXhr) {
    this.realXhr = realXhr;
  }

  open(realOpen) {
    return proxyFunction(realOpen, (args, applyReal) => {
      this.openArguments = {
        method: args[0],
        url: args[1],
        async: args[2] === false ? false : true,
      };
      return applyReal();
    });
  }

  setRequestHeader(realSetRequestHeader) {
    return proxyFunction(realSetRequestHeader, (args, applyReal) => {
      const name = args.length > 0 ? args[0] : '';
      const value = args.length > 1 ? args[1] : '';
      this.requestHeaders.push({ name, value });
      return applyReal();
    });
  }

  send(realSend, target) {
    return proxyFunction(realSend, async (args, applyReal) => {
      const body = args[0];
      const xhrTrack = {
        ...this.openArguments,
        requestHeaders: this.requestHeaders,
        requestBody: body,
      };
      let override = null;
      if (this.openArguments.async) {
        override = await overridesStorage.findOverride(xhrTrack);
      } else {
        override = overridesStorage.findOverrideSync(xhrTrack);
      }
      trackXhr(
        {
          ...xhrTrack,
          isProxied: !!override,
          ...(!!override && { override }),
        },
        override ? target : this.realXhr,
      );
      if (override) {
        this.override = override;
        this.readyState = this.realXhr.readyState;
        const overrideXhr = new OverrideXhr(this);
        overrideXhr.doOverride(body, this.readyState);
      } else {
        return applyReal();
      }
    });
  }

  getResponseHeader(realGetResponseHeader) {
    return proxyFunction(realGetResponseHeader, (args, applyReal) => {
      if (this.override) {
        const responseHeaders = this.override?.responseHeaders;
        // 2 is ready state HEADERS_RECEIVED
        if (this.readyState >= 2 && responseHeaders) {
          const headerName = args[0];
          return (
            responseHeaders
              .filter(({ name }) => name === headerName)
              .map(({ value }) => value)
              .join(', ') || null
          );
        }
        return null;
      } else {
        return applyReal();
      }
    });
  }

  getAllResponseHeaders(realGetAllResponseHeaders) {
    return proxyFunction(realGetAllResponseHeaders, (args, applyReal) => {
      if (this.override) {
        const responseHeaders = this.override?.responseHeaders;
        // 2 is ready state HEADERS_RECEIVED
        if (this.readyState >= 2 && responseHeaders) {
          return (
            responseHeaders
              // no es6 template literals in injected script
              .map(({ name, value }) => name + ': ' + value)
              .join('\n\r') || null
          );
        }
        return null;
      } else {
        return applyReal();
      }
    });
  }

  abort(realAbort) {
    return proxyFunction(realAbort, (args, applyReal) => {
      if (this.override) {
        // TODO: shall we set it back to false in case of reopen?
        this.isAborted = true;
        this.readyState = 0;
        this.response = '';
        this._responseText = '';
      } else {
        return applyReal();
      }
    });
  }

  dispatchEvent(event) {
    if (typeof event === 'function') {
      return proxyFunction(event, (args, applyReal) => applyReal());
    } else {
      this.realXhr.dispatchEvent(event);
    }
  }

  get responseType() {
    return this.realXhr.responseType;
  }

  get responseText() {
    if (this.override) {
      return this._responseText;
    }
    return this.realXhr.responseText;
  }

  get responseXml() {
    if (this.override) {
      return this.response;
    }
    return this.realXhr.responseXml;
  }

  get statusText() {
    if (this.override) {
      const responseCode = this.status;
      if (responseCode) {
        return (
          HTTP_STATUS_CODES.find(({ code }) => code === responseCode)?.status ||
          ''
        );
      }
      return '';
    }
    return this.realXhr.statusText;
  }
}
