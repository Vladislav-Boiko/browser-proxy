// Abstract, needs sendMessage method to be implemented.
export default class Messaging {
  listeners = {};

  onMessage(message) {
    if (message?.type && message?.type in this.listeners) {
      this.listeners[message?.type].forEach((callback) =>
        callback(message?.payload)
      );
    }
  }

  subscribeSingle(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  subscribe(eventType, listener) {
    if (Array.isArray(eventType)) {
      eventType.forEach((event) => this.subscribeSingle(event, listener));
    } else {
      this.subscribeSingle(eventType, listener);
    }
  }

  emit(eventType, payload) {
    this.sendMessage({ type: eventType, payload });
  }
}
