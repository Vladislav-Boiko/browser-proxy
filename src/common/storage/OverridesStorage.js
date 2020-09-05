class OverridesStorage {
  getAll() {
    return new Promise((resolve) => {
      chrome.storage.local.get("overrides", (result = {}) =>
        resolve(result.overrides)
      );
    });
  }

  async getSingle(id) {
    const all = await this.getAll();
    return all[id];
  }

  async remove(id) {
    let all = await this.getAll();
    delete all[id];
    chrome.storage.local.set("overrides", all);
  }

  async update(id, payload) {
    let all = await this.getAll();
    all[id] = payload;
    chrome.storage.local.set({ overrides: all });
  }
}

export default new OverridesStorage();
