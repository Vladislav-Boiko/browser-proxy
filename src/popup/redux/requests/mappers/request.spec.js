import { TYPES } from 'atoms/ResponseType/ResponseType';
import { updateWindowRequests } from './request';

describe('updateWindowRequests', () => {
  it('maps the status to responseCode', () => {
    const result = updateWindowRequests([], [{ status: 404 }]);
    expect(result[0].responseCode).toBe(404);
  });

  it('maps the method', () => {
    const result = updateWindowRequests([], [{ type: 'DELETE' }]);
    expect(result[0].method).toBe('DELETE');
  });

  it('maps default chunk delay correctly', () => {
    const id = 'id';
    const result = updateWindowRequests([], [{ id, sentTimestamp: 0 }]);
    expect(result[0].responseBody).toStrictEqual([{ value: '', delay: 0 }]);
  });

  it('maps a default chunk with delay correctly', () => {
    const id = 'id';
    const result = updateWindowRequests(
      [],
      [{ id, sentTimestamp: 100, chunkTimestamp: 123 }],
    );
    expect(result[0].responseBody).toStrictEqual([{ value: '', delay: 23 }]);
  });

  it('sums up the chunks time if value is empty', () => {
    const id = 'id';
    let result = updateWindowRequests([], [{ id, sentTimestamp: 100 }]);
    result = updateWindowRequests(result, [{ id, chunkTimestamp: 145 }]);
    result = updateWindowRequests(result, [{ id, chunkTimestamp: 200 }]);
    expect(result[0].responseBody).toStrictEqual([{ value: '', delay: 100 }]);
  });

  it('sums up the chunks time if value is empty, and then sets a cumulative value', () => {
    const id = 'id';
    let result = updateWindowRequests([], [{ id, sentTimestamp: 100 }]);
    result = updateWindowRequests(result, [{ id, chunkTimestamp: 145 }]);
    result = updateWindowRequests(result, [{ id, chunkTimestamp: 200 }]);
    result = updateWindowRequests(result, [
      { id, chunkTimestamp: 250, response: 'abc' },
    ]);
    expect(result[0].responseBody).toStrictEqual([
      { value: '', delay: 150, value: 'abc' },
    ]);
  });

  it('adds a chunk delay correctly', () => {
    const id = 'id';
    let result = updateWindowRequests([], [{ id, sentTimestamp: 100 }]);
    result = updateWindowRequests(result, [
      { id, chunkTimestamp: 145, response: 'abc' },
    ]);
    result = updateWindowRequests(result, [
      { id, chunkTimestamp: 200, response: 'abcdef' },
    ]);
    expect(result[0].responseBody).toStrictEqual([
      { value: '', delay: 45, value: 'abc' },
      { value: '', delay: 55, value: 'def' },
    ]);
  });

  it('maps chunk body without response events correctly', () => {
    const id = 'id';
    const result = updateWindowRequests([], [{ id, sentTimestamp: 100 }]);
    expect(result[0].responseBody).toStrictEqual([{ value: '', delay: 0 }]);
  });

  it('maps chunk body correctly', () => {
    const id = 'id';
    const response = 'ABCDEF';
    let result = updateWindowRequests([], [{ id, sentTimestamp: 100 }]);
    result = updateWindowRequests(result, [
      { id, chunkTimestamp: 145, response },
    ]);
    expect(result[0].responseBody).toStrictEqual([
      { value: response, delay: 45 },
    ]);
  });

  it('maps subsequent chunk bodies correctly', () => {
    const id = 'id';
    let result = updateWindowRequests([], [{ id, sentTimestamp: 100 }]);
    result = updateWindowRequests(result, [
      { id, chunkTimestamp: 145, response: 'ABC' },
    ]);
    result = updateWindowRequests(result, [
      { id, chunkTimestamp: 200, response: 'ABCDEF' },
    ]);
    expect(result[0].responseBody).toStrictEqual([
      { value: 'ABC', delay: 45 },
      { value: 'DEF', delay: 55 },
    ]);
  });

  it('Updated the responseCode property correctly', () => {
    const result = updateWindowRequests(
      [{ id: 'A', responseCode: 200 }],
      [{ id: 'A', status: 201 }],
    );
    expect(result[0].responseCode).toBe(201);
  });

  it('maps the response type correctly', () => {
    let result = updateWindowRequests([], [{ id: 'A', responseType: '' }]);
    expect(result[0].responseType).toBe(TYPES.TEXT);

    result = updateWindowRequests(result, [{ id: 'A', responseType: 'text' }]);
    expect(result[0].responseType).toBe(TYPES.TEXT);

    result = updateWindowRequests(result, [{ id: 'A', responseType: 'json' }]);
    expect(result[0].responseType).toBe(TYPES.JSON);

    result = updateWindowRequests(result, [
      { id: 'A', responseType: 'ArrayBuffer' },
    ]);
    expect(result[0].responseType).toBe(TYPES.ARRAY_BUFFER);

    result = updateWindowRequests(result, [{ id: 'A', responseType: 'blob' }]);
    expect(result[0].responseType).toBe(TYPES.BLOB);
  });

  it('maps the response headers correctly', () => {
    const headers = `header: value
      header name: value2
      header name: value 3`;
    const result = updateWindowRequests(
      [],
      [{ id: 'A', responseHeaders: headers }],
    );
    expect(result[0].responseHeaders).toStrictEqual([
      { name: 'header', value: 'value' },
      { name: 'header name', value: 'value2' },
      { name: 'header name', value: 'value 3' },
    ]);
  });
});
