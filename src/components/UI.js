import Game from 'components/Game';
import {byClass, byId, on, setContent} from '../util';

export default class UI {
  /**
   * Construct a chess timer UI.
   * @param  {number} seconds The length of the timers
   * @param  {string} ID1     DOM id of first timer
   * @param  {string} ID2     DOM id of second timer
   * @return {UI}
   */
  constructor(seconds, ID1, ID2) {
    this.seconds = seconds;
    this.ID1 = ID1;
    this.ID2 = ID2;
    this.game = new Game(seconds, ID1, ID2);
    this.timers = byClass('timer');
  }

  /**
   * Setup click/event handlers.
   */
  setup() {
    this.timers.forEach(element => {
      // Get timer and timer display elements
      let timer = this.game.timers[element.id];
      let display = byClass('display', element)[0];

      // Setup default display
      setContent(display, timer.getRemainingFormat(this.seconds));

      // Update display on tick and stop
      ['tick', 'stop'].forEach(event => {
        timer.on(event, (remaining) => {
          setContent(display, remaining);
        });
      });

      // Set click handlers
      on(byClass('button', element)[0], 'click', () => this.onButtonClick(element));
      on(byId('reset'), 'click', () => this.onResetClick());

      // Set game event handlers
      this.game.on('reset', () => this.resetTimers());
      this.game.on('end', (t, timerId) => this.logWinner(timerId));
      this.game.on('switch', (t, timerId) => this.swapButtons(timerId));
    });
  }

  /**
   * Get the opposing player's timer.
   * @param {string} id Player to find the opponent for
   */
  getOpponent(id) {
    return id === this.ID1 ? this.ID2 : this.ID1;
  }

  /**
   * Swap disabled statuses of buttons.
   * @param {string} timerId DOM id of timer to enable
   */
  swapButtons(timerId) {
     // Swap button statuses
     byClass('button', byId(timerId))[0].disabled = true;
     byClass('button', byId(this.getOpponent(timerId)))[0].disabled = false;
   }

   /**
    * Log the winner when a timer runs out and reset the game.
    * @param {string} timerId DOM id of winning timer
    */
  logWinner(timerId) {
    // Since `this.game` emits the loser, log the opposite player as winner.
    if (timerId === this.ID1) console.log('Player 2 wins!');
    if (timerId === this.ID2) console.log('Player 1 wins!');
    this.game.reset();
  }

  /**
   * Reenable buttons and reset timer displays.
   */
  resetTimers() {
    this.timers.forEach(element => {
      let timer = this.game.timers[element.id];
      let display = byClass('display', element)[0];
      setContent(display, timer.getRemainingFormat(this.seconds)); // Reset display

      byClass('button', element)[0].disabled = false;
    });
  }

  /**
   * Timer button click handler.
   *
   * Starts opponents clock on first click, swap players on subsequent clicks.
   * @param {Element} element Button DOM element
   */
  onButtonClick(element) {
    let opponent = this.getOpponent(element.id);

    if (!this.game.started) this.game.start(opponent);
    else this.game.switchPlayer(opponent);

    this.swapButtons(element.id);
  }

  /**
   * Reset button click handler
   */
  onResetClick() {
    this.game.reset();
  }

}
