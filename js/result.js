import {ResultView} from '../js/result-view.js';
import {welcome} from '../js/welcome.js';
import {showPage} from '../js/show-page.js';
import {currentGame} from '../js/game-store.js';
import {calculateFastAnswers} from '../js/calculate-score.js';
import {MINIMUM_PLAYERS_LIVES, MINIMUM_PLAYER_TIME} from '../js/game.js';
const STARTING_INDEX = 1;

const titleOptions = {
  winner: `Вы настоящий меломан!`,
  zeroTries: `Какая жалость!`,
  zeroTime: `Увы и ах!`
};

const buttonOptions = {
  winner: `Сыграть ещё раз`,
  looser: `Попробовать ещё раз`
};

export const finalResult = () => {
  const pageResult = new ResultView(currentGame);

  pageResult.onMainReplayClickTry = () => {
    pageResult.currentGame.state.round = STARTING_INDEX;
    pageResult.currentGame.setInitialParams();
    showPage(welcome);
  };

  pageResult.formTitleMarkup = (player) => {
    let markupTitle = titleOptions.winner;

    if (player.totalTime === MINIMUM_PLAYER_TIME) {
      markupTitle = titleOptions.zeroTime;
    } else if (player.lives === MINIMUM_PLAYERS_LIVES) {
      markupTitle = titleOptions.zeroTries;
    }

    return markupTitle;
  };

  pageResult.formResultInfoMarkup = (player, resultText) => {
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
        <span class="main-comparison">${resultText}</span>
      `;

    if (playerMistakes >= 3 || finalTime === 0) {
      markupInfoResult = `<div class="main-stat">${resultText}</div>`;
    }

    return markupInfoResult;
  };

  pageResult.formButtonMarkup = (player) => {
    let markupButton = buttonOptions.winner;

    if (player.lives === MINIMUM_PLAYERS_LIVES || player.totalTime === MINIMUM_PLAYER_TIME) {
      markupButton = titleOptions.zeroTries;
    }

    return markupButton;
  };

  return pageResult;
};

