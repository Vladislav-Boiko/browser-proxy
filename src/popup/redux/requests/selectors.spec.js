import { getAllRequests, getRequestsForActiveUrls } from './selectors';

describe('all requests selector', () => {
  it('retrieves all requests from store', () => {
    const store = {
      requests: {
        a: [1, 2, 3],
        b: [4, 5, 6],
      },
    };
    const selected = getAllRequests(store);
    expect(selected).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('retrieves all requests from store for a certain window', () => {
    const store = {
      requests: {
        a: [1, 2, 3],
        b: [4, 5, 6],
      },
      activeWindows: {
        someUrl: ['a'],
      },
    };
    const selected = getRequestsForActiveUrls(['someUrl'])(store);
    expect(selected).toEqual([1, 2, 3]);
  });

  it('retrieves all requests from store from more than one window', () => {
    const store = {
      requests: {
        a: [1, 2, 3],
        b: [4, 5, 6],
      },
      activeWindows: {
        someUrl: ['a', 'b'],
      },
    };
    const selected = getRequestsForActiveUrls(['someUrl'])(store);
    expect(selected).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('ignores requests from some other windows', () => {
    const store = {
      requests: {
        a: [1, 2, 3],
        b: [4, 5, 6],
        c: [7, 8, 9],
      },
      activeWindows: {
        someUrl: ['a', 'b'],
        someOtherUrl: ['c'],
      },
    };
    const selected = getRequestsForActiveUrls(['someUrl'])(store);
    expect(selected).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
