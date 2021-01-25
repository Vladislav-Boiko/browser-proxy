import { setRequests } from './actions';
import reduce from './reducer';

describe('requests reducer', () => {
  it('can save new requests', () => {
    const payload = { someWindowId: [{ id: 'A', code: 200 }] };
    const action = setRequests(payload);
    const newState = reduce({}, action);
    expect(newState).toEqual(payload);
  });

  it('can update an existing request', () => {
    const payload = { someWindowId: [{ id: 'A', code: 201 }] };
    const action = setRequests(payload);
    const newState = reduce({ someWindowId: [{ id: 'A', code: 200 }] }, action);
    expect(newState).toEqual(payload);
  });

  it('can add properties to an existing request', () => {
    const payload = { someWindowId: [{ id: 'A', code: 201, test: 123 }] };
    const action = setRequests(payload);
    const newState = reduce({ someWindowId: [{ id: 'A', code: 200 }] }, action);
    expect(newState).toEqual(payload);
  });

  it('can add a new request', () => {
    const payload = { someWindowId: [{ id: 'B', code: 201, test: 123 }] };
    const action = setRequests(payload);
    const newState = reduce({ someWindowId: [{ id: 'A', code: 200 }] }, action);
    expect(newState).toEqual({
      someWindowId: [
        { id: 'A', code: 200 },
        { id: 'B', code: 201, test: 123 },
      ],
    });
  });

  it('can add a new window', () => {
    const payload = { another: [{ id: 'A', code: 201, test: 123 }] };
    const action = setRequests(payload);
    const newState = reduce({ someWindowId: [{ id: 'A', code: 200 }] }, action);
    expect(newState).toEqual({
      someWindowId: [{ id: 'A', code: 200 }],
      another: [{ id: 'A', code: 201, test: 123 }],
    });
  });
});
