import {EventEmitter} from 'events';

/**
 * Timer using process.hrtime().
 */
export default class Timer extends EventEmitter {
  constructor(seconds) {
    super();
    this.seconds = seconds;
    this.reset();
  }

  start() {
    this._startTime = performance.now();
    this.started = true;
    this.emit('start', this.getRemainingFormat());

    let lastTick = this.seconds;
    this.interval = setInterval(() => {
      let remainingSecs = this.getRemainingSecs();
      if (remainingSecs <= 0) {
        this.stop();
        this.emit('end');
      } else if (remainingSecs < lastTick) {
        this.tick();
      }

      lastTick = remainingSecs;
    }, 1);

    this.tick();
  }

  /**
   * Emit remaining time as HH:MM, or the given payload.
   * @param  {[type]} payload [description]
   * @return {[type]}         [description]
   */
  tick(payload) {
    this.emit('tick', payload || this.getRemainingFormat());
  }

  stop () {
    if (this.started) {
      this._remaining = this.getRemaining();
      this._clearInterval();
      delete this._startTime;
      this.started = false;
      this.emit('stop', this.getRemainingFormat());
    }
  }

  reset () {
    this.total = this.seconds * 1000.0;
    this._remaining = this.total;
    this._clearInterval();
    this.tick();
  }

  getElapsed() {
    if (!this._startTime) return 0;
    return performance.now() - this._startTime;
  }

  getRemaining() {
    if (!this.started) return this._remaining;
    return this._remaining - this.getElapsed();
  }

  getRemainingSecs() {
    return Math.floor(this.getRemaining() / 1000) + 1;
  }

  getRemainingFormat(arg) {
    let rem = arg || this.getRemainingSecs();
    let min = (Math.floor(rem / 60)).toString();
    let sec = Math.floor(rem - (min * 60)).toString();
    if (sec.length < 2) sec = '0' + sec;
    return min + ':' + sec;
  }

  _clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

}
