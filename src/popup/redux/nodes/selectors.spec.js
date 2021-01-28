import { getItemsToSerialize } from './selectors';
import { TYPES } from 'organisms/TreeView/Nodes/index';

describe('Selects correct nodes to save', () => {
  it('saved present domains', () => {
    const store = {
      nodes: [
        {
          id: 'domain1',
          nodes: [],
        },
        {
          id: 'domain2',
        },
      ],
    };
    const toSerialize = getItemsToSerialize(store);
    expect(toSerialize).toMatchObject(store);
  });

  it('filters out first opened domains', () => {
    const store = {
      nodes: [
        {
          id: 'domain1',
          nodes: [],
          isFirstOpen: true,
        },
        {
          id: 'domain2',
        },
      ],
    };
    const toSerialize = getItemsToSerialize(store);
    expect(toSerialize).toStrictEqual({ nodes: [{ id: 'domain2' }] });
  });

  it("doesn't filter out unsaved domains", () => {
    const store = {
      nodes: [
        {
          id: 'domain1',
          nodes: [],
          type: TYPES.DOMAIN,
          isUnsaved: true,
        },
        {
          id: 'domain2',
        },
      ],
    };
    const toSerialize = getItemsToSerialize(store);
    expect(toSerialize).toStrictEqual(store);
  });

  it('saves subnodes', () => {
    const store = {
      nodes: [
        {
          id: 'domain1',
          nodes: [{ id: 1 }, { id: 2 }],
        },
      ],
    };
    const toSerialize = getItemsToSerialize(store);
    expect(toSerialize).toStrictEqual(store);
  });

  it('filters out unsaved subnodes', () => {
    const store = {
      nodes: [
        {
          id: 'domain1',
          nodes: [{ id: 1 }, { id: 2, isUnsaved: true }, { id: 3 }],
        },
      ],
    };
    const toSerialize = getItemsToSerialize(store);
    expect(toSerialize).toStrictEqual({
      nodes: [
        {
          id: 'domain1',
          nodes: [{ id: 1 }, { id: 3 }],
        },
      ],
    });
  });

  it('filters out unsaved subnodes deep', () => {
    const store = {
      nodes: [
        {
          id: 'domain1',
          nodes: [
            { id: 1 },
            {
              id: 2,
              nodes: [{ id: 4 }, { id: 5, isUnsaved: true }, { id: 6 }],
            },
            { id: 3 },
          ],
        },
      ],
    };
    const toSerialize = getItemsToSerialize(store);
    expect(toSerialize).toStrictEqual({
      nodes: [
        {
          id: 'domain1',
          nodes: [
            { id: 1 },
            {
              id: 2,
              nodes: [{ id: 4 }, { id: 6 }],
            },
            { id: 3 },
          ],
        },
      ],
    });
  });
});
