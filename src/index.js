/* eslint-disable no-alert*/
import Game from 'components/Game';
import {byClass, byId, on, setContent} from './util';

const ID1 = 't1';
const ID2 = 't2';

/**
 * Get the opposite player by ID
 * @param {string} id Player to find the opposite for
 */
export function oppositePlayer(id) {
  return id === ID1 ? ID2 : ID1;
}

/**
 * Swap disabled statuses of buttons.
 * @param {string} timerId DOM id to enable
 */
export function swapBtns(timerId) {
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

    // Start opponents clock on first click, swap players on subsequent clicks.
    on(byClass('button', el)[0], 'click', function() {
      let opponent = oppositePlayer(el.id);
      if (!this.started) this.start(opponent);
      else this.switchPlayer(opponent);
      swapBtns(el.id);
    }.bind(game));

  });

  // On reset click, reset the game.
  on(byId('reset'), 'click', function() { this.reset(); }.bind(game));

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
