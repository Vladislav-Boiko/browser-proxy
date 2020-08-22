import Communication from "./Communication";

import Communication from "./Communication";

class PluginCommunication extends Communication {
  constructor() {
    super();
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) =>
      this.onMessage(message)
    );
  }

  send(message) {
    chrome.runtime.sendMessage(message);
  }
}

export default new PluginCommunication();
