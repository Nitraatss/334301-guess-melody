import {creatDOMElement} from "../js/create-dom-element.js";
import {AbstractView} from '../js/abstract-view.js';
import {calculateScore, calculateTime} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';
import {MINIMUM_PLAYERS_LIVES, MINIMUM_PLAYER_TIME} from '../js/game.js';
import {ResultMarkup} from '../js/result-markup.js';
import {currentGame} from '../js/game-store.js';
import {welcome} from '../js/welcome.js';
import {showPage} from '../js/show-page.js';
const STARTING_INDEX = 1;

const className = `main main--result`;

export class ResultView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    currentGame.setTotalScore(calculateScore(currentGame.state.answersResuls));
    currentGame.setTotalTime(calculateTime(currentGame.state.answersResuls));

    const currentPlayerResult = {
      answersResuls: currentGame.state.answersResuls,
      totalScore: currentGame.state.totalScore,
      lives: currentGame.state.lives,
      totalTime: currentGame.state.totalTime,
    };

    let result = showResults(currentGame.state.allPlayers, currentPlayerResult);

    if (currentPlayerResult.lives !== MINIMUM_PLAYERS_LIVES && currentPlayerResult.totalTime !== MINIMUM_PLAYER_TIME) {
      currentGame.addPlayerResult(currentPlayerResult);
    }

    const resultMarkupParts = new ResultMarkup(currentPlayerResult, result);

    return `
      ${resultMarkupParts.header}
      <h2 class="title">${resultMarkupParts.formTitleMarkup()}</h2>

      ${resultMarkupParts.formResultInfoMarkup()}

      <span role="button" tabindex="0" class="main-replay">${resultMarkupParts.formButtonMarkup()}</span>
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
    currentGame.state.round = STARTING_INDEX;
    currentGame.setInitialParams();
    showPage(welcome);
  }
}
