import { DOMAIN } from "../../content/constants";
import { evolve } from "immutableql";
const APPLICATION_NAME = "browser-proxy";

class OverridesStorage {
  getAll() {
    return new Promise((resolve) => {
      chrome.storage.local.get(APPLICATION_NAME, (result = {}) =>
        resolve(result)
      );
    });
  }

  async getAllForDomain(domain = DOMAIN) {
    const all = await this.getAll();
    return all[APPLICATION_NAME]?.[domain]?.overrides || {};
  }

  async getSingle(id, domain = DOMAIN) {
    const all = await this.getAllForDomain(domain);
    return all[id];
  }

  async remove(id, domain = DOMAIN) {
    let all = await this.getAllForDomain(domain);
    if (all) {
      delete all[id];
      this.setOverridesForDomain(all, domain);
    }
  }

  // TODO: manage serveral overrides matching the same rule.
  async update(id, payload, domain = DOMAIN) {
    let all = await this.getAllForDomain(domain);
    all[id] = payload;
    this.setOverridesForDomain(all, domain);
  }

  async setOverridesForDomain(overrides, domain = DOMAIN) {
    const all = await this.getAll();
    const updated = evolve(all, {
      [APPLICATION_NAME]: {
        [domain]: {
          overrides,
        },
      },
    });
    chrome.storage.local.set(updated);
  }
}

export default new OverridesStorage();
