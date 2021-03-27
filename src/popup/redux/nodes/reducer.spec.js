import { updateDeep, serializedReducer } from './reducer';
import {
  addDomain,
  updateNode,
  toggleNode,
  addOverride,
  addFolder,
  removeFolder,
  removeOverride,
  removeDomain,
  moveNode,
} from './actions';

describe('updateDeep', () => {
  it('Shall update nodes on the first level', () => {
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
    const updated = updateDeep(state, [1], { test: 'mock' });
    expect(updated[0].test).toBe('mock');
  });

  it('Shall update nested nodes', () => {
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
    const updated = updateDeep(state, [1, 3, 5], { payload: 'def' });
    expect(updated[0].nodes[1].nodes[0].payload).toBe('def');
  });

  it('Shall not change state if path not found', () => {
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
    const updated = updateDeep(state, [1, 3, 4], { payload: 'def' });
    expect(updated).toStrictEqual(state);
  });

  it('Shall not change state if path not provided', () => {
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
    const updated = updateDeep(state, null, { payload: 'def' });
    expect(updated).toStrictEqual(state);
  });
});

describe('Add domain', () => {
  it('Adds domain to the end', () => {
    const action = addDomain({
      id: 'another',
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[1].id).toBe('another');
  });
});

describe('Update node', () => {
  describe('shall update existing node on the first level', () => {
    const action = updateNode({
      id: 1,
      test: 'lorem',
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].test).toBe('lorem');
  });

  describe('shall update nested node', () => {
    const action = updateNode({
      id: 5,
      test: 'lorem',
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[1].nodes[0].test).toBe('lorem');
  });

  describe('shall not update if there is no such node', () => {
    const action = updateNode({
      id: 6,
      test: 'lorem',
    });
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
    const updated = serializedReducer(state, action);
    expect(updated).toStrictEqual(state);
  });
});

describe('Toggle node', () => {
  it('Shall toggle nodes on the first level', () => {
    const action = toggleNode(1);
    const state = [
      {
        id: 1,
        isOn: true,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
    ];
    const updated = serializedReducer(state, action);
    expect(updated[0].isOn).toBe(false);
  });

  it('Shall toggle nested nodes', () => {
    const action = toggleNode(3);
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[1].isOn).toBe(true);
  });

  it('Shall set the first open to false', () => {
    const action = toggleNode(3);
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[1].isFirstOpen).toBe(false);
  });

  it('Shall not toggle anything if id cannot be found', () => {
    const action = toggleNode(7);
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
    const updated = serializedReducer(state, action);
    expect(updated).toStrictEqual(state);
  });
});

describe('addOverride', () => {
  it('Can add override to a domain', () => {
    const action = addOverride({
      parentId: 1,
      override: {
        id: 6,
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].id).toEqual(6);
  });

  it('Can add override to a sub node', () => {
    const action = addOverride({
      parentId: 2,
      override: {
        id: 6,
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].nodes[0].id).toEqual(6);
  });

  it('Sets the defaults of an override', () => {
    const action = addOverride({
      parentId: 2,
      override: {
        id: 6,
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].nodes[0].name).toEqual('New Override');
    expect(updated[0].nodes[0].nodes[0].type).toEqual('GET');
    expect(updated[0].nodes[0].nodes[0].isOn).toEqual(true);
    expect(updated[0].nodes[0].nodes[0].isUnsaved).toEqual(true);
    expect(updated[0].nodes[0].nodes[0].responseType).toEqual('JSON');
    expect(updated[0].nodes[0].nodes[0].responseCode).toEqual('200');
    expect(updated[0].nodes[0].nodes[0].responseBody[0].value).toEqual(
      undefined,
    );
    expect(updated[0].nodes[0].nodes[0].responseBody[0].delay).toEqual('200ms');
  });

  it('prettifies response json', () => {
    const responseBody = '{ "lorem": "ipsum" }';
    const action = addOverride({
      parentId: 2,
      override: {
        id: 6,
        responseBody: [{ value: responseBody, delay: '200ms' }],
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].nodes[0].responseBody[0].value).toEqual(
      JSON.stringify(JSON.parse(responseBody), null, 2),
    );
  });

  it('does not add override if nowhere to add', () => {
    const responseBody = '{ "lorem": "ipsum" }';
    const action = addOverride({
      parentId: 8,
      override: {
        id: 6,
        responseBody: [{ value: responseBody, delay: '200ms' }],
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated).toEqual(state);
  });
});

describe('addFolder', () => {
  it('Can add folder to a sub node', () => {
    const action = addFolder({
      parentId: 2,
      folder: {
        id: 6,
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].nodes[0].id).toEqual(6);
  });

  it('gives folder a default name if no name is provided', () => {
    const action = addFolder({
      parentId: 2,
      folder: {
        id: 6,
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].nodes[0].name).toEqual('New Folder');
  });

  it('overrides folder name with the provided one', () => {
    const action = addFolder({
      parentId: 2,
      folder: {
        id: 6,
        name: 'Some name',
      },
    });
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes[0].nodes[0].name).toEqual('Some name');
  });
});

describe('removeFolder', () => {
  it('can remove a folder', () => {
    const action = removeFolder(3);
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes.length).toEqual(2);
    expect(updated[0].nodes.find(({ id }) => id === 3)).toBeFalsy();
  });

  it('makes no change if folder not found', () => {
    const action = removeFolder(10);
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
    const updated = serializedReducer(state, action);
    expect(updated).toStrictEqual(state);
  });
});

describe('removeOverride', () => {
  it('can remove an override', () => {
    const action = removeOverride(2);
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
    const updated = serializedReducer(state, action);
    expect(updated[0].nodes.length).toEqual(2);
    expect(updated.find(({ id }) => id === 2)).toBeFalsy();
  });
});

describe('removeDomain', () => {
  it('can remove a domain', () => {
    const action = removeDomain(2);
    const state = [
      {
        id: 1,
        nodes: [
          { id: 2 },
          { id: 3, nodes: [{ id: 5, payload: 'abc' }] },
          { id: 4 },
        ],
      },
      { id: 2 },
      { id: 3 },
    ];
    const updated = serializedReducer(state, action);
    expect(updated.length).toEqual(2);
    expect(updated.find(({ id }) => id === 2)).toBeFalsy();
  });
});

describe('moveNode', () => {
  it('can move an override from one place to another', () => {
    const state = [{ id: 'a', nodes: [{ id: 1 }, { id: 2 }] }];
    const action = moveNode({ from: 1, to: 2 });
    const updated = serializedReducer(state, action);
    console.log(updated[0].nodes);
    expect(updated[0].nodes[0].id).toBe(2);
    expect(updated[0].nodes[1].id).toBe(1);
  });
});
