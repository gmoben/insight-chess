/* eslint-disable no-alert*/
import Game from 'components/Game';

const ID1 = 't1';
const ID2 = 't2';

/**
 * Convenience function for `getElementsByClassName`
 * @param {string} cls DOM class
 * @param {Element} [el] Optional element to call into
 */
function byClass(cls, el) {
  if (el) return [].slice.call(el.getElementsByClassName(cls));
  return [].slice.call(document.getElementsByClassName(cls));
}

/**
 * Convenience function for `getElementById`
 * @param {string} cls DOM class
 * @param {Element} [el] Optional element to call into
 */
function byId(id, el) {
  if (el) return el.getElementById(id);
  return document.getElementById(id);
}

/**
 * Convenience function for setting `innerHTML`
 * @param {Element} el      DOM element
 * @param {string} content innerHTML content
 */
function setContent(el, content) {
  el.innerHTML = content;
}

/**
 * Convenience function for `addEventListener`
 * @param  {Element}   el        DOM element
 * @param  {string}   eventName Event name to listen for
 * @param  {Function} cb        Event handler
 */
function on(el, eventName, cb) {
  el.addEventListener(eventName, cb);
}

/**
 * Get the opposite player by ID
 * @param {string} id Player to find the opposite for
 */
function oppositePlayer(id) {
  return id === ID1 ? ID2 : ID1;
}

/**
 * Swap disabled statuses of buttons.
 * @param {string} timerId DOM id to enable
 */
function swapBtns(timerId) {
  // Swap button statuses
  byClass('button', byId(timerId))[0].disabled = true;
  byClass('button', byId(oppositePlayer(timerId)))[0].disabled = false;
}

window.onload = () => {
  // Length of the timers.
  let seconds = 4 * 60;

  let game = new Game(seconds, ID1, ID2);

  byClass('timer').forEach(el => {
    // Get timer and timer display elements
    let timer = game.timers[el.id];
    let display = byClass('display', el)[0];

    // Setup default display
    setContent(display, timer.getRemainingFormat(seconds));

    // Update display on tick and stop
    ['tick', 'stop'].forEach(event => {
      timer.on(event, (remaining) => {
        setContent(display, remaining);
      });
    });

    // Start on first click, swap players on subsequent clicks.
    on(byClass('button', el)[0], 'click', function() {
      if (!this.started) {
        this.start(el.id);
      } else {
        this.switchPlayer(el.id);
      }
    }.bind(game));

  });

  // On reset click, reset the game.
  on(byId('reset'), 'click', function() { this.reset(); }.bind(game));

  // Set disabled statuses of buttons based on which timer is started first.
  game.on('start', (timer, timerId) => {
    swapBtns(timerId);
  });

  // Reenable buttons and reset timer displays on reset.
  game.on('reset', () => {

    byClass('timer').forEach(el => {
      let timer = game.timers[el.id];
      let display = byClass('display', el)[0];
      setContent(display, timer.getRemainingFormat(seconds)); // Reset display

      byClass('button', el)[0].disabled = false;
    });
  });

  // Log the winner when a timer runs out and reset the game.
  game.on('end', (timer, timerId) => {
    // Since `game` emits the loser, log the opposite player as winner.
    if (timerId === ID1) console.log('Player 2 wins!');
    if (timerId === ID2) console.log('Player 1 wins!');
    game.reset();
  });

  // Swap disabled statuses if a button is clicked after the game has started.
  game.on('switch', (timer, timerId) => {
    swapBtns(timerId);
  });

};
