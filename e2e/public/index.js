let testSets = [];
// queue
let tests = [];
const describe = (name, call) => testSets.push({ name, call });

const it = (name, call) => tests.push({ name, call });

const assert = (msg) => {
  throw { msg };
};
const assertEquals = (got, expected) => {
  if (JSON.stringify(got) != JSON.stringify(expected)) {
    assert(
      'Expected ' +
        JSON.stringify(got) +
        ' to equal ' +
        JSON.stringify(expected),
    );
  }
};

const assertTrue = (what) => {
  if (!what) {
    assert('Expected true, got false');
  }
};

const renderTestResult = (name, assertion) => {
  const resultDiv = document.createElement('div');
  resultDiv.classList.add('test-case');
  resultDiv.classList.add(!assertion ? 'test-case_success' : 'test-case_fail');
  document.body.appendChild(resultDiv);
  if (assertion) {
    const error = document.createElement('h5');
    error.innerHTML = 'Failed: ' + name;
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = assertion.msg;
    document.body.appendChild(error);
    document.body.appendChild(errorMessage);
  }
};

const runtATest = async (test) => {
  let assertion = null;
  try {
    await test.call();
  } catch (e) {
    assertion = e;
  }
  renderTestResult(test.name, assertion);
};

const runTests = async () => {
  for (let { name, call } of testSets) {
    const header = document.createElement('h4');
    header.innerHTML = name;
    document.body.appendChild(header);
    await call();
    while (tests.length) {
      const test = tests.pop();
      await runtATest(test);
    }
  }
};

describe('xhr text data', () => {
  it('Can override part of the response body using a variable', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test1');
    const promise = new Promise((resolve) => {
      xhr.onload = () => {
        assertEquals(xhr.responseText, 'Hello World! 1');
        resolve();
      };
    });
    xhr.send();
    await promise;
  });

  it('Can override the entire response', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test2');
    const promise = new Promise((resolve) => {
      xhr.onload = () => {
        assertEquals(xhr.responseText, 'Some new text');
        resolve();
      };
    });
    xhr.send();
    await promise;
  });

  it('Can override response using part variable from folder', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test3');
    const promise = new Promise((resolve) => {
      xhr.onload = () => {
        assertEquals(xhr.responseText, 'Some test3 text');
        resolve();
      };
    });
    xhr.send();
    await promise;
  });

  it('Can set a delay', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test5');
    const promise = new Promise((resolve) => {
      xhr.onload = resolve;
    });
    const now = Date.now();
    xhr.send();
    await promise;
    const delay = Date.now() - now;
    assertTrue(delay >= 1000);
  });

  it('Can fetch chunked data', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test6');
    const promise = new Promise((resolve) => {
      xhr.onload = () => {
        assertEquals(xhr.responseText, 'ABCDEFGHIJKLM');
        resolve();
      };
    });
    xhr.send();
    await promise;
  });

  it('Can change the response code', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test8');
    const promise = new Promise((resolve) => {
      xhr.onload = () => {
        assertEquals(xhr.status, '418');
        resolve();
      };
    });
    xhr.send();
    await promise;
  });

  it('Can fetch chunked data', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test9');
    const promise = new Promise((resolve) => {
      xhr.onload = () => {
        assertEquals(xhr.getResponseHeader('Am_I_a_teapot'), 'no!');
        resolve();
      };
    });
    xhr.send();
    await promise;
  });
});

describe('Fetch text data', () => {
  it('Can override part of the response body using a variable', async () => {
    const result = await fetch('/test1');
    const text = await result.text();
    assertEquals(text, 'Hello World! 1');
  });

  it('Can override the entire response', async () => {
    const result = await fetch('/test2');
    const text = await result.text();
    assertEquals(text, 'Some new text');
  });

  it('Can override response using part variable from folder', async () => {
    const result = await fetch('/test3');
    const text = await result.text();
    assertEquals(text, 'Some test3 text');
  });

  it('Can set a delay', async () => {
    const now = Date.now();
    const result = await fetch('/test5');
    await result.text();
    const delay = Date.now() - now;
    assertTrue(delay >= 1000);
  });

  it('Can fetch chunked data', async () => {
    const result = await fetch('/test6');
    const text = await result.text();
    assertEquals(text, 'ABCDEFGHIJKLM');
  });

  it('Can change the response code', async () => {
    const result = await fetch('/test8');
    const code = await result.status;
    assertEquals(code, 418);
  });

  it('Can set the response headers', async () => {
    const result = await fetch('/test9');
    const headers = await result.headers;
    assertEquals(headers.get('Am_I_a_teapot'), 'no!');
  });
});

describe('Fetch json data', () => {
  it('Can parse json as a result', async () => {
    const result = await fetch('/test4');
    const json = await result.json();
    assertEquals(json, { a: '123' });
  });

  it('Can parse chunked json as a result', async () => {
    const result = await fetch('/test7');
    const json = await result.json();
    assertEquals(json, { a: '123' });
  });
});

describe('Override headers', () => {
  it('Can determine override based on a different request header', async () => {
    const result1 = await fetch('/request-header-1', {
      headers: { 'X-TEST': 'A' },
    });
    const text1 = await result1.text();
    assertEquals(text1, 'mock result');

    const result2 = await fetch('/request-header-1', {
      headers: { 'X-TEST': 'B' },
    });
    const text2 = await result2.text();
    assertEquals(text2, 'server response');
  });
});

describe('XHR Override with set response type', () => {
  it('Can return an array Buffer', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test1');
    const promise = new Promise((resolve, reject) => {
      xhr.onload = () => {
        const response = xhr.response;
        try {
          assertTrue(response instanceof ArrayBuffer);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
    });
    xhr.responseType = 'arraybuffer';
    xhr.send();
    await promise;
  });

  it('Will return correct data as array Buffer data from a request', async () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/test1');
    const promise = new Promise((resolve, reject) => {
      xhr.onload = () => {
        const response = xhr.response;
        try {
          const encoder = new TextDecoder('utf-8');
          const asString = encoder.decode(response);
          assertEquals(asString, 'Hello World! 1');
          resolve();
        } catch (e) {
          reject(e);
        }
      };
    });
    xhr.responseType = 'arraybuffer';
    xhr.send();
    await promise;
  });
});

runTests();
