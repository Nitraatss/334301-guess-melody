import {creatDOMElement} from "../js/create-dom-element.js";
import AbstractView from '../js/abstract-view.js';
import {calculateScore, calculateTime} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';
import {stat} from '../js/network-service';
import {calculateFastAnswers} from '../js/calculate-score.js';
import {MINIMUM_PLAYERS_LIVES, MINIMUM_PLAYER_TIME} from '../js/game-model.js';

const className = `main main--result`;

const titleOptions = {
  winner: `Вы настоящий меломан!`,
  zeroTries: `Какая жалость!`,
  zeroTime: `Увы и ах!`
};

const buttonOptions = {
  winner: `Сыграть ещё раз`,
  looser: `Попробовать ещё раз`
};

export default class ResultView extends AbstractView {
  constructor(currentGame) {
    super();
    this.currentGame = currentGame;
  }

  get template() {
    if (this.currentGame.state.answersResuls) {
      this.currentGame.setTotalScore(calculateScore(this.currentGame.state.answersResuls));
      this.currentGame.setTotalTime(calculateTime(this.currentGame.state.answersResuls));
    } else {
      this.currentGame.setTotalScore(0);
      this.currentGame.setTotalTime(0);
    }

    this.currentPlayerResult = {
      answersResuls: this.currentGame.state.answersResuls,
      totalScore: this.currentGame.state.totalScore,
      lives: this.currentGame.state.lives,
      totalTime: this.currentGame.state.totalTime,
    };

    let result;

    if (this.currentPlayerResult.lives !== MINIMUM_PLAYERS_LIVES && this.currentPlayerResult.totalTime !== MINIMUM_PLAYER_TIME) {

      let otherPlayersResults = [];

      stat.loadResults().then(
          () => {
            otherPlayersResults = stat.allResults;
            result = showResults(otherPlayersResults, this.currentPlayerResult);

            const mainComparison = this.element.querySelector(`.main-comparison`);
            mainComparison.textContent = result;

            stat.saveResult(this.currentPlayerResult);
          }
      );
    }

    return `
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">${this.formTitleMarkup(this.currentPlayerResult)}</h2>

      ${this.formResultInfoMarkup(this.currentPlayerResult)}

      <span role="button" tabindex="0" class="main-replay">${this.formButtonMarkup(this.currentPlayerResult)}</span>
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

  formTitleMarkup(player) {
    let markupTitle = titleOptions.winner;

    if (player.totalTime === MINIMUM_PLAYER_TIME) {
      markupTitle = titleOptions.zeroTime;
    } else if (player.lives === MINIMUM_PLAYERS_LIVES) {
      markupTitle = titleOptions.zeroTries;
    }

    return markupTitle;
  }

  formResultInfoMarkup(player) {
    let fastAnswersNumber = calculateFastAnswers(player.answersResuls);
    let playerMistakes = player.lives;
    let finalTime = player.totalTime;
    let finalTimeMinutes = Math.floor(finalTime / 60);
    let finalTimeSeconds = finalTime - Math.floor(finalTime / 60) * 60;

    let markupInfoResult = `
        <div class="main-stat">За&nbsp;${finalTimeMinutes}&nbsp;минуты и ${finalTimeSeconds}&nbsp;секунд
          <br>вы&nbsp;набрали ${player.totalScore} баллов (${fastAnswersNumber} быстрых)
          <br>совершив ${playerMistakes} ошибки
        </div>
        <span class="main-comparison"></span>
      `;

    if (playerMistakes >= 3 || finalTime === 0) {
      markupInfoResult = `<div class="main-stat">${showResults([], this.currentPlayerResult)}</div>`;
    }

    return markupInfoResult;
  }

  formButtonMarkup(player) {
    let markupButton = buttonOptions.winner;

    if (player.lives === MINIMUM_PLAYERS_LIVES || player.totalTime === MINIMUM_PLAYER_TIME) {
      markupButton = titleOptions.zeroTries;
    }

    return markupButton;
  }
}
