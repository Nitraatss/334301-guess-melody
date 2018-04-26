import {timer} from '../js/timer.js';
import {getRandomInt} from '../js/utils.js';
import {MINIMUM_PLAYERS_LIVES} from '../js/game.js';
import Application from '../js/application.js';

const ARTIST_PAGE_INDEX = 1;
const GENRE_PAGE_INDEX = 2;
const LAST_INDEX = 11;

export class GamePage {
  constructor(model) {
    this.model = model;
  }

  init() {
  }

  initGame() {
    this.model.setInitialParams();

    timer.timeLimit = this.model.state.timeLimit;
  }

  showRandomPage() {
    this.stopTicking();
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
    } else {
      Application.showResult();
    }
  }

  startTicking() {

    timer.updateTimerMinutes();
    timer.updateTimerSeconds();

    if (timer.time) {
      timer.time--;
    } else {
      clearInterval(this.interval);
    }


    this.interval = setInterval(this.startTicking, 1000
    );
  }

  stopTicking() {
    clearInterval(this.interval);
  }

  get element() {
    return this.page;
  }
}
