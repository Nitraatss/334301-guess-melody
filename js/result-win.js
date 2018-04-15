import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome} from '../js/welcome.js';
import {actualPlayer, allPlayers, setPlayerInitialState} from '../js/player.js';
import {calculateScore, calculateTime, calculateFastAnswers} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';
import {page} from '../js/game.js';

let playerMistakes;
let finalScore;
let finalTime;
let finalTimeMinutes;
let finalTimeSeconds;
let fastAnswersNumber;
let result;

const resultWinMarkup = () => {
  actualPlayer.totalScore = calculateScore(actualPlayer.answersResuls);
  actualPlayer.totalTime = calculateTime(actualPlayer.answersResuls);
  fastAnswersNumber = calculateFastAnswers(actualPlayer.answersResuls);

  playerMistakes = 3 - actualPlayer.lives;
  finalScore = actualPlayer.totalScore;
  finalTime = actualPlayer.totalTime;
  finalTimeMinutes = Math.floor(finalTime / 60);
  finalTimeSeconds = finalTime - Math.floor(finalTime / 60) * 60;

  result = showResults(allPlayers, actualPlayer);
  allPlayers.push(actualPlayer);

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
const resultWinClassName = `main main--result`;

const app = document.querySelector(`.app`);

const resultWin = {
  page: () => creatDOMElement(resultWinMarkup(), resultWinClassName),
  init: () => {
    const onMainReplayClickWin = () => {
      page.number = 1;
      setPlayerInitialState(actualPlayer);
      showPage(welcome);
    };

    const mainReplayWin = app.querySelector(`.main-replay`);

    mainReplayWin.addEventListener(`click`, onMainReplayClickWin);
  }
};

export {resultWin};
