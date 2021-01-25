import { getWindowsForUrl } from './selectors';
describe('active windows selectors', () => {
  it('gets correct windows for active url', () => {
    const someUrl = 'https://example.com';
    const result = getWindowsForUrl(someUrl)({
      activeWindows: {
        [someUrl]: ['windowId1', 'windowId2'],
      },
    });
    expect(result).toEqual(['windowId1', 'windowId2']);
  });

  it('gets correct windows for active url wildcard', () => {
    const someUrl = 'https://example.com';
    const result = getWindowsForUrl('https://e*')({
      activeWindows: {
        [someUrl]: ['windowId1', 'windowId2'],
      },
    });
    expect(result).toEqual(['windowId1', 'windowId2']);
  });

  it('can get window ids matching several different urls', () => {
    const someUrl = 'https://example.com';
    const someOtherUrl = 'https://e.com';
    const result = getWindowsForUrl('https://e*')({
      activeWindows: {
        [someUrl]: ['windowId1', 'windowId2'],
        [someOtherUrl]: ['windowId3', 'windowId4'],
      },
    });
    expect(result).toEqual([
      'windowId1',
      'windowId2',
      'windowId3',
      'windowId4',
    ]);
  });
});
