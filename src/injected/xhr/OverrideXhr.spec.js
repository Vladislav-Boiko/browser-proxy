import proxyXhr from './WindowXhrProxy';
import overridesStorage from '../overrides/Overrides';

const realFindOverride = overridesStorage.findOverride;
const mockFindOverride = (overrideToFind) => {
  overridesStorage.findOverride = () => overrideToFind;
};

const unMockFindOverride = () => {
  overridesStorage.findOverride = realFindOverride;
};

describe('Xhr overrider', () => {
  beforeAll(() => {
    proxyXhr(global);
  });

  afterEach(() => {
    unMockFindOverride();
  });

  it('Shall do a simple override', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onload = () => {
      expect(xhr.response).toEqual('ABC');
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall return same responseText as response', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onload = () => {
      expect(xhr.responseText).toEqual('ABC');
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall do an override with chunks', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseBody: [
        { delay: 1, value: 'ABC' },
        { delay: 1, value: 'DEF' },
      ],
    });
    xhr.onload = () => {
      expect(xhr.response).toEqual('ABCDEF');
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall return correct response code', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 204,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onload = () => {
      expect(xhr.status).toEqual(204);
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall return default response code if no provided', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onload = () => {
      expect(xhr.status).toEqual(200);
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall have response code 0 before loading', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onreadystatechange = () => {
      // 3 is ready state LOADING
      if (xhr.readyState < 3) {
        expect(xhr.status).toEqual(0);
      } else {
        done();
      }
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall have the set response code on loading', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onreadystatechange = () => {
      // 3 is ready state LOADING
      if (xhr.readyState === 3) {
        expect(xhr.status).toEqual(500);
      } else {
        done();
      }
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall go through all the readyStates before loaded', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 301,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    expect(xhr.readyState).toEqual(0);
    let lastState = xhr.readyState;
    xhr.onreadystatechange = () => {
      const currentState = xhr.readyState;
      const isContinuous =
        currentState === lastState || currentState === lastState + 1;
      expect(isContinuous).toBe(true);
      lastState = currentState;
    };
    xhr.onload = () => {
      expect(xhr.readyState).toBe(4);
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall have ready state loading on progress event', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.onprogress = () => {
      expect(xhr.readyState).toBe(3);
    };
    xhr.onload = () => {
      done();
    };
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall attach events through event listeners', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.addEventListener('progress', () => {
      expect(xhr.readyState).toBe(3);
    });
    xhr.addEventListener('load', () => {
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall override a response header correctly', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
    });
    xhr.addEventListener('load', () => {
      expect(xhr.getResponseHeader('ABC')).toEqual('DEF');
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall override multiple response headers with same name correctly', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [
        { name: 'ABC', value: 'DEF' },
        { name: 'GHI', value: 'JKL' },
        { name: 'ABC', value: 'MNO' },
      ],
    });
    xhr.addEventListener('load', () => {
      expect(xhr.getResponseHeader('ABC')).toEqual('DEF, MNO');
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall return null for an unknown header', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
    });
    xhr.addEventListener('load', () => {
      expect(xhr.getResponseHeader('TEST')).toEqual(null);
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall return all response headers', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [
        { name: 'ABC', value: 'DEF' },
        { name: 'GHI', value: 'JKL' },
      ],
    });
    xhr.addEventListener('load', () => {
      expect(xhr.getAllResponseHeaders()).toEqual(
        ['ABC: DEF', 'GHI: JKL'].join('\n\r'),
      );
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall return null instead of all response headers if none are provided', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.addEventListener('load', () => {
      expect(xhr.getAllResponseHeaders()).toEqual(null);
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall reset the state if abort called after done', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
    });
    xhr.addEventListener('load', () => {
      xhr.abort();
      expect(xhr.readyState).toEqual(0);
      expect(xhr.response).toEqual('');
      expect(xhr.responseText).toEqual('');
      expect(xhr.getAllResponseHeaders()).toEqual(null);
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall reset the state if called while the request is sent', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [
        { delay: 1, value: 'ABC' },
        { delay: 1, value: 'DEF' },
        { delay: 1, value: 'GHIJKLM' },
      ],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
    });
    let loaded = 0;
    xhr.addEventListener('progress', (e) => {
      loaded++;
      if (loaded === 2) {
        xhr.abort();
      }
      if (loaded === 3) {
        // we shall never reach this.
        expect(false).toBeTruthy();
      }
      done();
    });
    xhr.addEventListener('load', () => {
      expect(xhr.readyState).toEqual(0);
      expect(xhr.response).toEqual('');
      expect(xhr.responseText).toEqual('');
      expect(xhr.getAllResponseHeaders()).toEqual(null);
      done();
    });
    xhr.open('GET', 'test');
    xhr.send();
  });

  it('Shall receive synchronous requests', (done) => {
    const xhr = new global.XMLHttpRequest();
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1000, value: 'ABC' }],
    });
    // false is the async flag -- calling a *sync* call
    xhr.open('GET', 'test', false);
    xhr.send();
    expect(xhr.response).toEqual('ABC');
    expect(xhr.status).toEqual(200);
    expect(xhr.readyState).toEqual(4);
    done();
  });

  it('Shall dispatch onloadstart of upload on send', (done) => {
    const xhr = new global.XMLHttpRequest();
    const payload = 'Some data to be uploaded';
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.upload.addEventListener('onloadstart', ({ loaded, total }) => {
      expect(loaded).toBe(0);
      expect(total).toBe(payload.length);
      done();
    });
    xhr.open('POST', 'test');
    xhr.send(payload);
  });

  it('Shall trigger loadstart of upload on send', (done) => {
    const xhr = new global.XMLHttpRequest();
    const payload = 'Some data to be uploaded';
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.upload.loadstart = ({ loaded, total }) => {
      expect(loaded).toBe(0);
      expect(total).toBe(payload.length);
      done();
    };
    xhr.open('POST', 'test');
    xhr.send(payload);
  });

  it('Shall dispatch progress event of upload on send', (done) => {
    const xhr = new global.XMLHttpRequest();
    const payload = 'Some data to be uploaded';
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.upload.addEventListener('onprogress', ({ loaded, total }) => {
      expect(loaded).toBe(payload.length);
      expect(total).toBe(payload.length);
      done();
    });
    xhr.open('POST', 'test');
    xhr.send(payload);
  });

  it('Shall dispatch onload on upload on send', (done) => {
    const xhr = new global.XMLHttpRequest();
    const payload = 'Some data to be uploaded';
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.upload.addEventListener('onload', ({ loaded, total }) => {
      expect(loaded).toBe(payload.length);
      expect(total).toBe(payload.length);
      done();
    });
    xhr.open('POST', 'test');
    xhr.send(payload);
  });

  it('Shall dispatch progress of loadend on send', (done) => {
    const xhr = new global.XMLHttpRequest();
    const payload = 'Some data to be uploaded';
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    xhr.upload.addEventListener('onloadend', ({ loaded, total }) => {
      expect(loaded).toBe(payload.length);
      expect(total).toBe(payload.length);
      done();
    });
    xhr.open('POST', 'test');
    xhr.send(payload);
  });
});
