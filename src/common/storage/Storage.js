import browser from '../browser';

const APPLICATION_NAME = 'browser-proxy';
const storage = browser.storage ? browser.storage : (browser.browser?.storage || browser.chrome?.storage);
class Storage {
  save(value) {
    return new Promise((resolve) => {
      storage &&
        storage.local.get(APPLICATION_NAME, (result) => {
          result[APPLICATION_NAME] = value;
          storage.local.set(result, resolve);
        });
    });
  }

  load(index, initialState) {
    return new Promise((resolve) => {
      storage &&
        storage.local.get(APPLICATION_NAME, (result) =>
          result[APPLICATION_NAME]
            ? resolve(result[APPLICATION_NAME]?.[index] || initialState)
            : resolve(initialState),
        );
    });
  }
}

export default Storage;
