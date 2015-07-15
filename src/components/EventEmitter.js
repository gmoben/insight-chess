export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, cb) {
    if (!this.events[event])
      this.events[event] = [];
    this.events[event].push(cb);
  }

  emit(event, ...args) {
    if (this.events[event])
      return this.events[event][0].apply(this, args);
  }
}
