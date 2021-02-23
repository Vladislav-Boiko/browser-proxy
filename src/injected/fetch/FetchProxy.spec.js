import proxyFetch from './FetchProxy';
import overridesStorage from '../overrides/Overrides';

const realFindOverride = overridesStorage.findOverride;
const mockFindOverride = (overrideToFind) => {
  overridesStorage.findOverride = () => overrideToFind;
};

const unMockFindOverride = () => {
  overridesStorage.findOverride = realFindOverride;
};

describe('Fetch proxy', () => {
  beforeAll(() => {
    proxyFetch(global);
  });

  afterEach(() => {
    unMockFindOverride();
  });

  it('Shall do a simple override', async () => {
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    const response = await global.fetch('test');
    const textResponse = await response.text();
    expect(textResponse).toBe('ABC');
  });

  it('Shall do an override with chunks', async () => {
    mockFindOverride({
      url: 'test',
      responseBody: [
        { delay: 1, value: 'ABC' },
        { delay: 1, value: 'DEF' },
      ],
    });
    const response = await global.fetch('test');
    const textResponse = await response.text();
    expect(textResponse).toEqual('ABCDEF');
  });

  it('Shall return correct response code', async () => {
    mockFindOverride({
      url: 'test',
      responseCode: 204,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    const response = await global.fetch('test');
    expect(response.status).toEqual(204);
  });

  it('Shall return default response code if no provided', async () => {
    mockFindOverride({
      url: 'test',
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    const response = await global.fetch('test');
    expect(response.status).toEqual(200);
  });

  it('Shall return OK true if status is in OK range', async () => {
    mockFindOverride({
      url: 'test',
      responseCode: 204,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    const response = await global.fetch('test');
    expect(response.ok).toBeTruthy();
  });

  it('Shall return OK false if status is not in OK range', async () => {
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
    });
    const response = await global.fetch('test');
    expect(response.ok).toBeFalsy();
  });

  it('Shall override a response header correctly', async () => {
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
    });
    const response = await global.fetch('test');
    const headers = response.headers;
    expect(headers.get('ABC')).toEqual('DEF');
  });

  it('Shall override multiple response headers with same name correctly', async () => {
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
    const response = await global.fetch('test');
    const headers = response.headers;
    expect(headers.get('ABC')).toEqual('DEF, MNO');
  });

  it('Shall return null for an unknown header', async () => {
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
    });
    const response = await global.fetch('test');
    const headers = response.headers;
    expect(headers.get('TEST')).toEqual(null);
  });

  it('Shall return the response Url from overridee', async () => {
    mockFindOverride({
      url: 'test',
      responseCode: 500,
      responseBody: [{ delay: 1, value: 'ABC' }],
      responseHeaders: [{ name: 'ABC', value: 'DEF' }],
      responseURL: 'http://exmaple.com/test',
    });
    const response = await global.fetch('test');
    expect(response.url).toEqual('http://exmaple.com/test');
  });
});
