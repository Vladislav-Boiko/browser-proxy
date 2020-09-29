import Storage from "./Storage";

class FoldersStorage extends Storage {
  async getAllFolders() {
    return await this.load("folders", []);
  }

  async saveFolders(folders) {
    await this.save("folders", folders);
  }
}

export default new FoldersStorage();
