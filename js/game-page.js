import Application from '../js/application.js';
import {timer} from '../js/timer.js';
import {MINIMUM_PLAYERS_LIVES} from '../js/game.js';

const FIRST_ROUND_INDEX = 2;
const LAST_INDEX = 11;
let interval;

export default class GamePage {
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
    if (this.model.state.lives === MINIMUM_PLAYERS_LIVES) {
      Application.showResult();
    } else if (this.model.state.round < LAST_INDEX) {
      const curentQuestionIndex = this.model.state.round - 1;

      this.model.nextRound();

      this.model.state.curentQuestion = this.model.state.questions[curentQuestionIndex];

      if (this.model.state.curentQuestion.type === `artist`) {
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
    this.checkTime();

    interval = setInterval(this.checkTime.bind(this), 1000);
  }

  stopTicking() {
    clearInterval(interval);
  }

  checkTime() {
    if (timer.tick() <= 0) {
      this.stopTicking();
      Application.showResult();
    } else {
      timer.updateTimerMinutes();
      timer.updateTimerSeconds();
      timer.changeColor();
    }
  }

  nextLevelQuestion(index) {
    this.model.state.curentQuestion = this.model.state.questions[index];
    this.model.state.questions.splice(index, 1);
  }

  get element() {
    return this.page;
  }
}
