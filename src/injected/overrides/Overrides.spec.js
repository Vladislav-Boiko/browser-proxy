import overrides from './Overrides';

describe('Overrides storage', () => {
  it('searches for an override with exact url match', () => {
    const override = overrides.findOverrideAmong({ url: 'test' }, [
      { url: 'test' },
    ]);
    expect(override).toStrictEqual({ url: 'test' });
  });

  it('declines override with another url', () => {
    const override = overrides.findOverrideAmong({ url: 'test1' }, [
      { url: 'test' },
    ]);
    expect(override).toStrictEqual(undefined);
  });

  it('searches for an override with exact method match', () => {
    const override = overrides.findOverrideAmong(
      { url: 'test', method: 'GET' },
      [{ url: 'test', method: 'GET' }],
    );
    expect(override).toStrictEqual({ url: 'test', method: 'GET' });
  });

  it('declines override with another method', () => {
    const override = overrides.findOverrideAmong(
      { url: 'test', method: 'GET' },
      [{ url: 'test', method: 'POST' }],
    );
    expect(override).toStrictEqual(undefined);
  });

  it('searches for an override with exact request headers match', () => {
    const override = overrides.findOverrideAmong(
      {
        url: 'test',
        method: 'GET',
        requestHeaders: [{ name: 'A', value: ' B' }],
      },
      [
        {
          url: 'test',
          method: 'GET',
          requestHeaders: [{ name: 'A', value: ' B' }],
        },
      ],
    );
    expect(override).toStrictEqual({
      url: 'test',
      method: 'GET',
      requestHeaders: [{ name: 'A', value: ' B' }],
    });
  });

  it('declines override if request headers differ', () => {
    const override = overrides.findOverrideAmong(
      {
        url: 'test',
        method: 'GET',
        requestHeaders: [{ name: 'A', value: ' B' }],
      },
      [
        {
          url: 'test',
          method: 'GET',
          requestHeaders: [{ name: 'C', value: 'D' }],
        },
      ],
    );
    expect(override).toStrictEqual(undefined);
  });

  it('declines override if request a single header differs', () => {
    const override = overrides.findOverrideAmong(
      {
        url: 'test',
        method: 'GET',
        requestHeaders: [{ name: 'A', value: ' B' }],
      },
      [
        {
          url: 'test',
          method: 'GET',
          requestHeaders: [
            { name: 'A', value: 'B' },
            { name: 'C', value: 'D' },
          ],
        },
      ],
    );
    expect(override).toStrictEqual(undefined);
  });
});

describe('Recursive search in own overrides', () => {
  beforeEach(() => {
    overrides.overrides = null;
  });

  it('finds an override in parent nodes', () => {
    overrides.overrides = { name: 'Some domain', nodes: [{ url: 'A' }] };
    const found = overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual({ url: 'A' });
  });

  it("Doesn't fail if no overrides are set", () => {
    const found = overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
  });

  it("Doesn't finds an override in parent nodes if there is no match", () => {
    overrides.overrides = { name: 'Some domain', nodes: [{ url: 'B' }] };
    const found = overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
  });

  it('finds an override in child nodes', () => {
    overrides.overrides = {
      name: 'Some domain',
      nodes: [{ name: 'Some folder', nodes: [{ url: 'A' }] }],
    };
    const found = overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual({ url: 'A' });
  });

  it("doesn't find an override in child nodes if there is no match", () => {
    overrides.overrides = {
      name: 'Some domain',
      nodes: [{ name: 'Some folder', nodes: [{ url: 'B' }] }],
    };
    const found = overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
  });
});
