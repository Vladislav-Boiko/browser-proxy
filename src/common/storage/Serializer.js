import Storage from './Storage';

class Serializer extends Storage {
  async getAllFolders() {
    return await this.load('folders', []);
  }

  async serialize(payload) {
    await this.save(payload);
  }

  async saveStore(store) {
    // TODO: filter unsaved and non-relevant values
    return await this.save({ store });
  }

  async loadStore() {
    return await this.load('store', {});
  }
}

export default new Serializer();
