import EventEmitter from 'components/EventEmitter';

/**
 * Timer using performance.now().
 */
export default class Timer extends EventEmitter {
  /**
   * Construct a timer with the total length specified in seconds
   * @param  {number} seconds Starting length in seconds.
   * @return {Timer}
   */
  constructor(seconds) {
    super();
    this.seconds = seconds;
    this.reset();
  }

  /**
   * Start counting down from the time remaining.
   */
  start() {
    this._startTime = performance.now();
    this.started = true;

    this.emit('start', this.getRemainingFormat());

    // Check every millisecond and emit a `tick` event
    // if client display should be updated.
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
   * @param  {string} [payload] String to emit with tick.
   */
  tick(payload) {
    this.emit('tick', payload || this.getRemainingFormat());
  }

  /**
   * Stop the timer.
   */
  stop () {
    if (this.started) {
      this._remaining = this.getRemaining();
      this._clearInterval();
      delete this._startTime;
      this.started = false;
      this.emit('stop', this.getRemainingFormat());
    }
  }

  /**
   * Reset to the starting length and stop ticking.
   */
  reset () {
    this.total = this.seconds * 1000.0;
    this._remaining = this.total;
    this._clearInterval();
    this.tick();
  }

  /**
   * Get elapsed time in floating point milliseconds.
   */
  getElapsed() {
    if (!this._startTime) return 0;
    return performance.now() - this._startTime;
  }

  /**
   * Get remaining time in floating point milliseconds.
   */
  getRemaining() {
    if (!this.started) return this._remaining;
    return this._remaining - this.getElapsed();
  }

  /**
   * Get remaining seconds, as would be displayed on a countdown timer.
   */
  getRemainingSecs() {
    return Math.floor(this.getRemaining() / 1000) + 1;
  }

  /**
   * Get remaining time as a string formatted `HH:MM`
   * @param {string} [arg]  Optionally specify the string to be formatted.
   */
  getRemainingFormat(arg) {
    let rem = arg || this.getRemainingSecs();
    let min = (Math.floor(rem / 60)).toString();
    let sec = Math.floor(rem - (min * 60)).toString();
    if (sec.length < 2) sec = '0' + sec;
    return min + ':' + sec;
  }

  /**
   * Clear any intervals set while ticking.
   */
  _clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

}
