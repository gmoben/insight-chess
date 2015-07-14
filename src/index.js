/* eslint-disable no-alert*/
import Game from 'components/Game';

const ID1 = 't1';
const ID2 = 't2';

function byClass(cls, el) {
  if (el) return [].slice.call(el.getElementsByClassName(cls));
  return [].slice.call(document.getElementsByClassName(cls));
}

function byId(id, el) {
  if (el) return el.getElementById(id);
  return document.getElementById(id);
}

function setContent(el, content) {
  el.innerHTML = content;
}

function on(el, eventName, cb) {
  el.addEventListener(eventName, cb);
}

function oppositePlayer(id) {
  return id === ID1 ? ID2 : ID1;
}

window.onload = () => {
  let seconds = 4;

  let game = new Game(seconds, ID1, ID2);

  function swapBtns(timerId) {
    // Swap button statuses
    byClass('button', byId(timerId))[0].disabled = true;
    byClass('button', byId(oppositePlayer(timerId)))[0].disabled = false;
  }

  byClass('timer').forEach(el => {
    let timer = game.timers[el.id];
    let display = byClass('display', el)[0];

    setContent(display, timer.getRemainingFormat(seconds)); // Setup default display

    timer.on('tick', (remaining) => {
      setContent(display, remaining);
    });

    timer.on('stop', (remaining) => {
      setContent(display, remaining);
    });

    on(byClass('button', el)[0], 'click', function() {
      if (!this.started) {
        this.start(el.id);
      } else {
        this.switchPlayer(el.id);
      }
    }.bind(game));

  });

  // Reset handler
  on(byId('reset'), 'click', function() { this.reset(); }.bind(game));

  // Game event handlers
  game.on('start', (timer, timerId) => {
    swapBtns(timerId);
  });

  game.on('reset', () => {
    // Reenable buttons
    byClass('timer').forEach(el => {
      let timer = game.timers[el.id];
      let display = byClass('display', el)[0];
      setContent(display, timer.getRemainingFormat(seconds)); // Reset display

      byClass('button', el)[0].disabled = false;
    });
  });

  game.on('end', (timer, timerId) => {
    // Since `game` emits the loser, log the opposite player as winner.
    if (timerId === ID1) console.log('Player 2 wins!');
    if (timerId === ID2) console.log('Player 1 wins!');
    game.reset();
  });

  game.on('switch', (timer, timerId) => {
    swapBtns(timerId);
  });

};
