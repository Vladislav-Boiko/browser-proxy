import Storage from "./Storage";
import { DOMAIN } from "../../content/constants";

class Serializer extends Storage {
  async getAllOverrides() {
    return await this.load("overrides", []);
  }

  async getAllOverridesForDomain(domain = DOMAIN) {
    // TODO: implement me
    return [];
  }

  async getAllFolders() {
    return await this.load("folders", []);
  }

  async serialize(payload) {
    await this.save(payload);
  }

  async getAllOverridesForDomain(domain = DOMAIN) {
    // TODO: implement me
    return [];
  }
}

export default new Serializer();
