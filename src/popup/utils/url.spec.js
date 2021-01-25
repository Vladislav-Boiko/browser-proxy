import { hasUrlMatch, createDefaultActiveUrl } from './url';

describe('hasUrl match', () => {
  it('shall match url with query parameters', () => {
    const tabUrl =
      'https://www.google.com/search?q=test&sourceid=chrome&ie=UTF-8';
    const match = createDefaultActiveUrl(tabUrl);
    expect(hasUrlMatch(tabUrl, match)).toBeTruthy();
  });

  it('shall match url with path', () => {
    const tabUrl = 'https://www.google.com/search/test';
    const match = createDefaultActiveUrl(tabUrl);
    expect(hasUrlMatch(tabUrl, match)).toBeTruthy();
  });

  it('shall match url without anything', () => {
    const tabUrl = 'https://www.google.com';
    const match = createDefaultActiveUrl(tabUrl);
    expect(hasUrlMatch(tabUrl, match)).toBeTruthy();
  });
});
