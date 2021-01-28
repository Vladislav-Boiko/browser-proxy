import { setRequests } from './actions';
import reduce from './reducer';

describe('requests reducer', () => {
  it('can save new requests', () => {
    const payload = { someWindowId: [{ id: 'A', status: 200 }] };
    const action = setRequests(payload);
    const newState = reduce({}, action);
    expect(newState).toMatchObject({
      someWindowId: [{ id: 'A', responseCode: 200 }],
    });
  });

  it('can update an existing request', () => {
    const payload = { someWindowId: [{ id: 'A', status: 201 }] };
    const action = setRequests(payload);
    const newState = reduce(
      { someWindowId: [{ id: 'A', responseCode: 200 }] },
      action,
    );
    expect(newState).toMatchObject({
      someWindowId: [{ id: 'A', responseCode: 201 }],
    });
  });

  it('can add properties to an existing request', () => {
    const payload = { someWindowId: [{ id: 'A', status: 201, test: 123 }] };
    const action = setRequests(payload);
    const newState = reduce(
      { someWindowId: [{ id: 'A', status: 200 }] },
      action,
    );
    expect(newState).toMatchObject({
      someWindowId: [{ id: 'A', responseCode: 201, test: 123 }],
    });
  });

  it('can add a new request', () => {
    const payload = { someWindowId: [{ id: 'B', status: 201, test: 123 }] };
    const action = setRequests(payload);
    const newState = reduce(
      { someWindowId: [{ id: 'A', responseCode: 200 }] },
      action,
    );
    expect(newState).toMatchObject({
      someWindowId: [
        { id: 'A', responseCode: 200 },
        { id: 'B', responseCode: 201, test: 123 },
      ],
    });
  });

  it('can add a new window', () => {
    const payload = { another: [{ id: 'A', status: 201, test: 123 }] };
    const action = setRequests(payload);
    const newState = reduce(
      { someWindowId: [{ id: 'A', responseCode: 200 }] },
      action,
    );
    expect(newState).toMatchObject({
      someWindowId: [{ id: 'A', responseCode: 200 }],
      another: [{ id: 'A', responseCode: 201, test: 123 }],
    });
  });
});
