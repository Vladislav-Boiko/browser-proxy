const APPLICATION_NAME = 'browser-proxy';

class Storage {
  save(value) {
    return new Promise((resolve) => {
      const browser = window.browser || window.chrome;
      browser.storage.local.get(APPLICATION_NAME, (result) => {
        result[APPLICATION_NAME] = value;
        browser.storage.local.set(result, resolve);
      });
    });
  }

  load(index, initialState) {
    const browser = window.browser || window.chrome;
    return new Promise((resolve) => {
      browser.storage.local.get(APPLICATION_NAME, (result) =>
        result[APPLICATION_NAME]
          ? resolve(result[APPLICATION_NAME]?.[index] || initialState)
          : resolve(initialState),
      );
    });
  }
}

export default Storage;
