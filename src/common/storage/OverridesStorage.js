import Storage from "./Storage";
import { DOMAIN } from "../../content/constants";

class OverridesStorage extends Storage {
  async getAllOverrides() {
    return await this.load("overrides", []);
  }

  async saveOverrides(overrides) {
    await this.save("overrides", overrides);
  }

  async getAllOverridesForDomain(domain = DOMAIN) {
    const allOverrides = await this.getAllOverrides();
    return (
      allOverrides.find((forDomain) => forDomain.domain === domain) || {
        domain,
        overrides: [],
      }
    );
  }

  async getOverride(id, domain = DOMAIN) {
    const allForDomain = await this.getAllOverridesForDomain(domain);
    return allForDomain?.overrides?.find((forId) => forId === id) || null;
  }

  // TODO: simplify this logic
  async updateOverride(id, override, domain = DOMAIN) {
    let allOverrides = await this.getAllOverrides();
    const domainIndex = allOverrides.findIndex(
      (forDomain) => forDomain.domain === domain
    );
    if (domainIndex >= 0) {
      const allOverridesForDomain = allOverrides[domainIndex]?.overrides;
      const idIndex = allOverridesForDomain.findIndex(
        (forId) => forId.id === id
      );
      if (idIndex) {
        allOverrides[domainIndex].overrides[idIndex] = { ...override, id };
      } else {
        allOverrides[domainIndex].overrides.push({ ...override, id });
      }
    } else {
      allOverrides.push({ domain, overrides: [{ ...override, id }] });
    }
    this.saveOverrides(allOverrides);
  }
}

export default new OverridesStorage();
