import {
  getItemsToSerialize,
  getNode,
  getParentId,
  findPath,
} from './selectors';
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

describe('getNode', () => {
  it('Can find a nested node', () => {
    const state = [
      {
        id: 1,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const node = getNode(state, [1, 3, 5]);
    expect(node.payload).toBe('abc');
  });

  it('Can find a direct node', () => {
    const state = [
      {
        id: 1,
        payload: 'def',
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const node = getNode(state, [1]);
    expect(node.payload).toBe('def');
  });
});

describe('getParentId', () => {
  it('Can find parent of a nested node', () => {
    const state = {
      id: 1,
      nodes: [
        { id: 2 },
        { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
        { id: 4 },
      ],
    };
    const parentId = getParentId(5)(state);
    expect(parentId).toBe(3);
  });

  it('returns null for a node without a parent', () => {
    const state = {
      nodes: [
        {
          id: 1,
          nodes: [
            { id: 2 },
            { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
            { id: 4 },
          ],
        },
      ],
    };
    const parentId = getParentId(1)(state);
    expect(parentId).toBe(null);
  });
});

describe('findPath', () => {
  it('Can find path to a deeply nested node', () => {
    const state = [
      {
        id: 1,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const path = findPath(5, state);
    expect(path).toStrictEqual([1, 3, 5]);
  });

  it('Can find path of a nested node', () => {
    const state = [
      {
        id: 1,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const path = findPath(3, state);
    expect(path).toStrictEqual([1, 3]);
  });

  it('Can find path of direct child', () => {
    const state = [
      {
        id: 1,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const path = findPath(1, state);
    expect(path).toStrictEqual([1]);
  });

  it('Returns null if cannot find path to the node', () => {
    const state = [
      {
        id: 1,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const path = findPath(10, state);
    expect(path).toStrictEqual(null);
  });
});
