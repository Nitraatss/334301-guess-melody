import {timer} from '../js/timer.js';
import {getRandomInt} from '../js/utils.js';
import {MINIMUM_PLAYERS_LIVES} from '../js/game.js';
import Application from '../js/application.js';

const ARTIST_PAGE_INDEX = 1;
const GENRE_PAGE_INDEX = 2;
const FIRST_ROUND_INDEX = 2;
const LAST_INDEX = 11;

export class GamePage {
  constructor(model) {
    this.model = model;
    this.interval = 0;
  }

  init() {
  }

  initGame() {
    this.model.setInitialParams();

    timer.timeLimit = this.model.state.timeLimit;
  }

  showRandomPage() {
    if (this.model.state.lives === MINIMUM_PLAYERS_LIVES) {
      Application.showResult();
    } else if (this.model.state.round < LAST_INDEX) {
      this.model.nextRound();

      let nextPageIndex = getRandomInt(ARTIST_PAGE_INDEX, GENRE_PAGE_INDEX);

      if (nextPageIndex === ARTIST_PAGE_INDEX) {
        Application.showLevelArtist();
      } else {
        Application.showLevelGenre();
      }

      if (this.model.state.round === FIRST_ROUND_INDEX) {
        this.startTicking();
      }
    } else {
      Application.showResult();
    }
  }

  startTicking() {
    if (timer.time) {
      timer.time--;
    } else {
      clearInterval(this.interval);
    }

    timer.updateTimerMinutes();
    timer.updateTimerSeconds();

    setInterval(this.startTicking, 1000);
  }

  stopTicking() {
    (() => {
      let i = setInterval(() => {}, 100000);
      while (i >= 0) {
        clearInterval(i--);
      }
    })();
  }

  get element() {
    return this.page;
  }
}
