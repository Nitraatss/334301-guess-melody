import {calculateFastAnswers} from '../js/calculate-score.js';
import {MINIMUM_PLAYERS_LIVES, MINIMUM_PLAYER_TIME} from '../js/game.js';

export class ResultMarkup {
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

    if (this.player.totalTime === MINIMUM_PLAYER_TIME) {
      markupTitle = this.titleOptions.zeroTime;
    } else if (this.player.lives === MINIMUM_PLAYERS_LIVES) {
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
          <br>вы&nbsp;набрали ${this.player.totalScore} баллов (${fastAnswersNumber} быстрых)
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

    if (this.player.lives === MINIMUM_PLAYERS_LIVES || this.player.totalTime === MINIMUM_PLAYER_TIME) {
      markupButton = this.titleOptions.zeroTries;
    }

    return markupButton;
  }
}
