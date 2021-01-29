import { bringCurrentDomainToTop } from './utils';

describe('bring current domain to top', () => {
  it("doesn't change the domains if no currentDomain provided", () => {
    const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = bringCurrentDomainToTop(nodes);
    expect(result).toStrictEqual(nodes);
  });

  it('brings current domain to top', () => {
    const nodes = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = bringCurrentDomainToTop(nodes, 2);
    expect(result).toStrictEqual([{ id: 2 }, { id: 1 }, { id: 3 }]);
  });
});
