// Abstract, needs sendMessage implemented.
export default class Communication {
  listeners = {};

  sendMessage = null;

  onMessage(message) {
    if (message?.type && message?.type in this.listeners) {
      this.listeners[message?.type].forEach((callback) =>
        callback(message?.payload)
      );
    }
  }

  subscribe(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  emit(eventType, payload) {
    this.send({ type: eventType, payload });
  }
}
