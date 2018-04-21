import {creatDOMElement} from "../js/create-dom-element.js";
import {AbstractView} from '../js/abstract-view.js';
import {calculateScore, calculateTime} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';
import {MINIMUM_PLAYERS_LIVES, MINIMUM_PLAYER_TIME} from '../js/game.js';

const className = `main main--result`;

export class ResultView extends AbstractView {
  constructor(currentGame) {
    super();
    this.currentGame = currentGame;
  }

  get template() {
    this.currentGame.setTotalScore(calculateScore(this.currentGame.state.answersResuls));
    this.currentGame.setTotalTime(calculateTime(this.currentGame.state.answersResuls));

    const currentPlayerResult = {
      answersResuls: this.currentGame.state.answersResuls,
      totalScore: this.currentGame.state.totalScore,
      lives: this.currentGame.state.lives,
      totalTime: this.currentGame.state.totalTime,
    };

    let result = showResults(this.currentGame.state.allPlayers, currentPlayerResult);

    if (currentPlayerResult.lives !== MINIMUM_PLAYERS_LIVES && currentPlayerResult.totalTime !== MINIMUM_PLAYER_TIME) {
      this.currentGame.addPlayerResult(currentPlayerResult);
    }

    return `
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this.formTitleMarkup(currentPlayerResult)}</h2>

      ${this.formResultInfoMarkup(currentPlayerResult, result)}

      <span role="button" tabindex="0" class="main-replay">${this.formButtonMarkup(currentPlayerResult)}</span>
    `;
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const mainReplayTry = this._element.querySelector(`.main-replay`);

    mainReplayTry.addEventListener(`click`, () => {
      this.onMainReplayClickTry();
    });
  }

  onMainReplayClickTry() {
  }

  formTitleMarkup() {
  }

  formResultInfoMarkup() {
  }

  formButtonMarkup() {
  }
}
