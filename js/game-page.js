import {currentGame} from '../js/game-store.js';
import {timer} from '../js/timer.js';

export class GamePage {
  constructor(model) {
    this.model = model;
  }

  init() {
    currentGame.setInitialParams();

    timer.timeLimit = currentGame.state.timeLimit;
  }

  timerStart() {
    timer.startTicking();
  }

  timerStop() {
    timer.stopTicking();
  }

  get element() {
    return this.model(currentGame);
  }
}
