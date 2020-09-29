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
    // TODO: implement me
    return [];
  }
}

export default new OverridesStorage();
