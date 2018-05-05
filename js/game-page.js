import Application from '../js/application.js';
import {timer} from '../js/timer.js';
import {MINIMUM_PLAYERS_LIVES} from '../js/game-model.js';

const FIRST_ROUND_INDEX = 2;
const LAST_INDEX = 11;
let interval;

export default class GamePage {
  constructor(model) {
    this.model = model;
  }

  _init() {
  }

  _initGame() {
    this.model.setInitialParams();

    timer.timeLimit = this.model.state.timeLimit;
  }

  _showRandomPage() {
    if (this.model.state.lives === MINIMUM_PLAYERS_LIVES) {
      Application.showResult();
    } else if (this.model.state.round < LAST_INDEX) {
      const currentQuestionIndex = this.model.state.round - 1;

      this.model.nextRound();

      this.model.state.currentQuestion = this.model.state.questions[currentQuestionIndex];

      if (this.model.state.currentQuestion.type === `artist`) {
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

  _startTicking() {
    this.checkTime();

    interval = setInterval(this.checkTime.bind(this), 1000);
  }

  _stopTicking() {
    clearInterval(interval);
  }

  _checkTime() {
    if (timer.tick() <= 0) {
      this.stopTicking();
      this.model.state.answersResults = [];
      this.model.state.totalTime = 0;
      Application.showResult();
    } else {
      timer.updateTimerMinutes();
      timer.updateTimerSeconds();
      timer.changeColor();
    }
  }

  get element() {
    return this.page;
  }
}
