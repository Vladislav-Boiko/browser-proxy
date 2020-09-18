const APPLICATION_NAME = "browser-proxy";

class Storage {
  save(index, value) {
    return new Promise((resolve) => {
      chrome.storage.local.get(APPLICATION_NAME, (result) => {
        if (result[APPLICATION_NAME]) {
          result[APPLICATION_NAME][index] = value;
        } else {
          result[APPLICATION_NAME] = { index: value };
        }
        chrome.storage.local.set(result);
        resolve();
      });
    });
  }

  load(index, initialState) {
    return new Promise((resolve) => {
      chrome.storage.local.get(APPLICATION_NAME, (result) =>
        result[APPLICATION_NAME]
          ? resolve(result[APPLICATION_NAME]?.[index] || initialState)
          : resolve(initialState)
      );
    });
  }
}

export default Storage;
