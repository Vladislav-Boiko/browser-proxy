const APPLICATION_NAME = 'browser-proxy';

const browser = window.browser || window.chrome;
class Storage {
  save(value) {
    return new Promise((resolve) => {
      browser.storage &&
        browser.storage.local.get(APPLICATION_NAME, (result) => {
          result[APPLICATION_NAME] = value;
          browser.storage.local.set(result, resolve);
        });
    });
  }

  load(index, initialState) {
    return new Promise((resolve) => {
      browser.storage &&
        browser.storage.local.get(APPLICATION_NAME, (result) =>
          result[APPLICATION_NAME]
            ? resolve(result[APPLICATION_NAME]?.[index] || initialState)
            : resolve(initialState),
        );
    });
  }
}

export default Storage;
