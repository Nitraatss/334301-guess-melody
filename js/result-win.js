import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome, welcomeInit} from '../js/welcome.js';

const resultWinInit = () => {
  const onMainReplayClickWin = () => {
    showPage(welcome);

    welcomeInit();
  };

  const mainReplayWin = app.querySelector(`.main-replay`);

  mainReplayWin.addEventListener(`click`, onMainReplayClickWin);
};

const app = document.querySelector(`.app`);

const resultWinMarkup = `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Вы настоящий меломан!</h2>
  <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
    <br>вы&nbsp;набрали 12 баллов (8 быстрых)
    <br>совершив 3 ошибки</div>
  <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
  <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
`;

const resultWinClassName = `main main--result`;

const resultWin = creatDOMElement(resultWinMarkup, resultWinClassName);

export {resultWin, resultWinInit};
