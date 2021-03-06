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

  it('finds an override in parent nodes', async (done) => {
    overrides.overrides = { name: 'Some domain', nodes: [{ url: 'A' }] };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual({ url: 'A' });
    done();
  });

  it("doesn't find an override in disabled parent nodes", async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      isOn: false,
      nodes: [{ url: 'A' }],
    };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
    done();
  });

  it("Doesn't fail if no overrides are set", async (done) => {
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
    done();
  });

  it("Doesn't finds an override in parent nodes if there is no match", async (done) => {
    overrides.overrides = { name: 'Some domain', nodes: [{ url: 'B' }] };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
    done();
  });

  it('finds an override in child nodes', async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      nodes: [{ name: 'Some folder', nodes: [{ url: 'A' }] }],
    };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual({ url: 'A' });
    done();
  });

  it("doesn't find an override in child nodes if it is disabled", async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      nodes: [{ name: 'Some folder', nodes: [{ url: 'A', isOn: false }] }],
    };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
    done();
  });

  it("doesn't find an override in child nodes if its domain is disabled", async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      nodes: [{ name: 'Some folder', isOn: false, nodes: [{ url: 'A' }] }],
    };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
    done();
  });

  it("doesn't find an override in child nodes if there is no match", async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      nodes: [{ name: 'Some folder', nodes: [{ url: 'B' }] }],
    };
    const found = await overrides.findOverride({ url: 'A' });
    expect(found).toStrictEqual(null);
    done();
  });
});

describe('Variables', () => {
  it('Matches a url with a variable', async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      variables: [{ name: '$test', value: '\\d+' }],
      nodes: [{ name: 'Some folder', nodes: [{ url: 'id=$test' }] }],
    };
    const found = await overrides.findOverride({ url: 'id=123' });
    expect(found).toStrictEqual({ url: 'id=$test' });
    done();
  });

  it('Matches a url with a variable in the middle', async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      variables: [{ name: '$test', value: '\\d+' }],
      nodes: [{ name: 'Some folder', nodes: [{ url: 'id=$test&f=bcg' }] }],
    };
    const found = await overrides.findOverride({ url: 'id=123&f=bcg' });
    expect(found).toStrictEqual({ url: 'id=$test&f=bcg' });
    done();
  });

  it('searches for an override with variable method match', async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      variables: [
        { name: '$test', value: '\\d+' },
        { name: '$method', value: 'GET' },
      ],
      nodes: [
        {
          name: 'Some folder',
          nodes: [{ url: 'id=$test&f=bcg', method: 'GET' }],
        },
      ],
    };
    const override = await overrides.findOverride({
      url: 'id=123&f=bcg',
      method: 'GET',
    });
    expect(override).toStrictEqual({ url: 'id=$test&f=bcg', method: 'GET' });
    done();
  });

  it('Matches a complete string correctly', () => {
    const result = overrides.matchStringWithVariables('ABCdeFG', '$token', [
      { name: '$token', value: '\\w+' },
    ]);
    expect(result.isMatch).toBeTruthy();
  });

  it('Matches a complete string value correctly', () => {
    const result = overrides.matchStringWithVariables('ABCdeFG', '$token', [
      { name: '$token', value: '\\w+' },
    ]);
    expect(result.variableMatches[0].match).toBe('ABCdeFG');
  });

  it('Matches a string with to variables at different positions correctly', () => {
    const result = overrides.matchStringWithVariables(
      'ABCDEFG',
      '$aOrBBCD$eOrGFG',
      [
        { name: '$aOrB', value: 'A|C' },
        { name: '$eOrG', value: 'E|G' },
      ],
    );
    expect(result.variableMatches[0].match).toBe('A');
    expect(result.variableMatches[1].match).toBe('E');
  });

  it('Matches an asterisk string correctly', () => {
    const result = overrides.matchStringWithVariables('ABCdeFG', '$token', [
      { name: '$token', value: '.*' },
    ]);
    expect(result.isMatch).toBeTruthy();
  });

  it('searches for an override with variable request headers match', async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      variables: [{ name: '$token', value: '\\w+' }],
      nodes: [
        {
          name: 'Some folder',
          nodes: [
            {
              url: 'id=123',
              requestHeaders: [{ name: 'token', value: '$token' }],
            },
          ],
        },
      ],
    };
    const override = await overrides.findOverride({
      url: 'id=123',
      requestHeaders: [{ name: 'token', value: 'ABCdeFG' }],
    });
    expect(override).toStrictEqual({
      url: 'id=123',
      requestHeaders: [{ name: 'token', value: '$token' }],
    });
    done();
  });

  it('Replaces a body part from url match', async (done) => {
    overrides.overrides = {
      name: 'Some domain',
      variables: [{ name: '$test', value: '\\d+' }],
      nodes: [
        {
          name: 'Some folder',
          nodes: [
            {
              url: 'id=$test',
              responseBody: [
                { value: '{ id: $test, name: "Vlad" }', delay: 200 },
              ],
            },
          ],
        },
      ],
    };
    const found = await overrides.findOverride({ url: 'id=123' });
    expect(found).toStrictEqual({
      url: 'id=$test',
      responseBody: [{ value: '{ id: 123, name: "Vlad" }', delay: 200 }],
    });
    done();
  });
});
