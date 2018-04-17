import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome} from '../js/welcome.js';
import {currentGame, ROUNDS} from '../js/player.js';
import {calculateScore, calculateTime, calculateFastAnswers} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';

const formResultsMarkup = (resultsMarkup) => {
  return resultsMarkup();
};

const resultClassName = `main main--result`;

const finalResultMarkup = () => {
  currentGame.setTotalScore(calculateScore(currentGame.state.answersResuls));
  currentGame.setTotalTime(calculateTime(currentGame.state.answersResuls));

  const currentPlayerResult = {
    answersResuls: currentGame.state.answersResuls,
    totalScore: currentGame.state.totalScore,
    lives: currentGame.state.lives,
    totalTime: currentGame.state.totalTime,
  };

  let result = showResults(currentGame.state.allPlayers, currentPlayerResult);

  if (currentPlayerResult.lives !== 3 && currentPlayerResult.totalTime !== 0) {
    currentGame.state.allPlayers.push(currentPlayerResult);
  }

  class Markup {
    constructor(player, resultText) {
      this.header = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
      this.titleOptions = {
        winner: `Вы настоящий меломан!`,
        zeroTries: `Какая жалость!`,
        zeroTime: `Увы и ах!`
      };
      this.buttonOptions = {
        winner: `Сыграть ещё раз`,
        looser: `Попробовать ещё раз`
      };
      this.resultText = resultText;
      this.player = player;
    }

    formTitleMarkup() {
      let markupTitle = this.titleOptions.winner;

      if (this.player.totalTime === 0) {
        markupTitle = this.titleOptions.zeroTime;
      } else if (this.player.lives === 3) {
        markupTitle = this.titleOptions.zeroTries;
      }

      return markupTitle;
    }

    formResultInfoMarkup() {
      let fastAnswersNumber = calculateFastAnswers(this.player.answersResuls);
      let playerMistakes = this.player.lives;
      let finalTime = this.player.totalTime;
      let finalTimeMinutes = Math.floor(finalTime / 60);
      let finalTimeSeconds = finalTime - Math.floor(finalTime / 60) * 60;

      let markupInfoResult = `
        <div class="main-stat">За&nbsp;${finalTimeMinutes}&nbsp;минуты и ${finalTimeSeconds}&nbsp;секунд
          <br>вы&nbsp;набрали ${currentPlayerResult.totalScore} баллов (${fastAnswersNumber} быстрых)
          <br>совершив ${playerMistakes} ошибки
        </div>
        <span class="main-comparison">${this.resultText}</span>
      `;

      if (playerMistakes >= 3 || finalTime === 0) {
        markupInfoResult = `<div class="main-stat">${this.resultText}</div>`;
      }

      return markupInfoResult;
    }

    formButtonMarkup() {
      let markupButton = this.buttonOptions.winner;

      if (this.player.lives === 3 || this.player.totalTime === 0) {
        markupButton = this.titleOptions.zeroTries;
      }

      return markupButton;
    }
  }

  const resultMarkupParts = new Markup(currentPlayerResult, result);

  return `
  ${resultMarkupParts.header}
  <h2 class="title">${resultMarkupParts.formTitleMarkup()}</h2>

  ${resultMarkupParts.formResultInfoMarkup()}

  <span role="button" tabindex="0" class="main-replay">${resultMarkupParts.formButtonMarkup()}</span>
  `;
};

const results = (resultMarkup, resultClassname) => ({
  page: () => creatDOMElement(formResultsMarkup(resultMarkup), resultClassname),
  init: () => {
    const onMainReplayClickTry = () => {
      currentGame.state.round = ROUNDS.STARTING_INDEX;
      currentGame.setInitialParams();
      showPage(welcome);
    };

    const app = document.querySelector(`.app`);

    const mainReplayTry = app.querySelector(`.main-replay`);

    mainReplayTry.addEventListener(`click`, onMainReplayClickTry);
  }
});

export const finalResult = results(finalResultMarkup, resultClassName);

