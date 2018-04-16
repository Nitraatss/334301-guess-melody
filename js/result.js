import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome} from '../js/welcome.js';
import {currentGame, allPlayers} from '../js/player.js';
import {calculateScore, calculateTime, calculateFastAnswers} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';
import {page} from '../js/game.js';

const formResultsMarkup = (resultsMarkup) => {
  return `
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    ${resultsMarkup()}
  `;
};

let playerMistakes;
let finalScore;
let finalTime;
let finalTimeMinutes;
let finalTimeSeconds;
let fastAnswersNumber;
let result;

const resultClassName = `main main--result`;

const resultWinMarkup = () => {
  currentGame.setTotalScore(calculateScore(currentGame.state.answersResuls));
  currentGame.setTotalTime(calculateTime(currentGame.state.answersResuls));
  fastAnswersNumber = calculateFastAnswers(currentGame.state.answersResuls);

  playerMistakes = 3 - currentGame.state.lives;
  finalScore = currentGame.state.totalScore;
  finalTime = currentGame.state.totalTime;
  finalTimeMinutes = Math.floor(finalTime / 60);
  finalTimeSeconds = finalTime - Math.floor(finalTime / 60) * 60;

  result = showResults(allPlayers, currentGame.state);
  allPlayers.push(currentGame.state);

  return `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;${finalTimeMinutes}&nbsp;минуты и ${finalTimeSeconds}&nbsp;секунд
    <br>вы&nbsp;набрали ${finalScore} баллов (${fastAnswersNumber} быстрых)
    <br>совершив ${playerMistakes} ошибки</div>
  <span class="main-comparison">${result}</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  `;
};

const resultZeroTriesMarkup = () => `
  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
`;

const resultTimeoutMarkup = () => `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
`;

const results = (resultMarkup, resultClassname) => ({
  page: () => creatDOMElement(formResultsMarkup(resultMarkup), resultClassname),
  init: () => {
    const onMainReplayClickTry = () => {
      page.number = 1;
      currentGame.setInitialParams();
      showPage(welcome);
    };

    const app = document.querySelector(`.app`);

    const mainReplayTry = app.querySelector(`.main-replay`);

    mainReplayTry.addEventListener(`click`, onMainReplayClickTry);
  }
});

export const resultWin = results(resultWinMarkup, resultClassName);

export const resultZeroTries = results(resultZeroTriesMarkup, resultClassName);

export const resultTimeOut = results(resultTimeoutMarkup, resultClassName);


