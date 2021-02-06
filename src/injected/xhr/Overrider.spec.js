import proxyXhr from './XhrProxy';
import overridesStorage from '../overrides/Overrides';

let realFindOverride = overridesStorage.findOverride;
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

  it('Shall return all resposne headers', (done) => {
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

  it('Shall return null instead of all resposne headers if none are provided', (done) => {
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
});
