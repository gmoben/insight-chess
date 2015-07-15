import EventEmitter from 'components/EventEmitter';
import Timer from 'components/Timer';

/**
 * Top-level Game class.
 */
export default class Game extends EventEmitter {
  /**
   * Construct a game using the given number of seconds
   * for each player. Pass in DOM ids for convienence.
   *
   * @param  {number} seconds Total seconds per player.
   * @param  {string} id1 First timer DOM id
   * @param  {string} id2 Second timer DOM id
   */
  constructor(seconds, id1, id2) {
    super();
    this._ids = [id1, id2];
    this.timers = {};
    this.timers[id1] = new Timer(seconds);
    this.timers[id2] = new Timer(seconds);
  }

  /**
   * Start the game by starting the specified timer.
   * @param {string} timerId DOM id of the timer to start first.
   */
  start(timerId) {
    this._activeTimer = this.timers[timerId];
    this._activeTimer.start();
    this.started = true;

    // Emit the first timer to run out.
    Object.keys(this.timers).map(_id => {
      let timer = this.timers[_id];
      timer.on('end', () => {
        this.emit('end', timer, _id);
      });
    });

    this.emit('start', this._activeTimer, timerId);
  }

  /**
   * Stop the active timer and start the given timer by id.
   * @param {string} timerId DOM id of the timer to activate.
   * @return [Timer] The active timer instance.
   */
  switchPlayer(timerId) {
    if (!this._activeTimer) throw new Error('Call start() first.');

    this._activeTimer.stop();

    this._activeTimer = this.timers[timerId];
    this._activeTimer.start();

    this.emit('switch', this._activeTimer, timerId);
    return this._activeTimer;
  }

  /**
   * Reset both timers.
   */
  reset() {
    Object.keys(this.timers).map(k => this.timers[k].reset());
    this.started = false;
    this.emit('reset');
  }
}
