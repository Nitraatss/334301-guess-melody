import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome, welcomeInit} from '../js/welcome.js';

const resultTimeoutInit = () => {
  const onMainReplayClickTime = () => {
    showPage(welcome);

    welcomeInit();
  };

  const mainReplayTime = app.querySelector(`.main-replay`);

  mainReplayTime.addEventListener(`click`, onMainReplayClickTime);
};

const app = document.querySelector(`.app`);

const resultTimeoutMarkup = `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
`;

const resultTimeoutClassName = `main main--result`;

const resultTimeout = creatDOMElement(resultTimeoutMarkup, resultTimeoutClassName);

export {resultTimeout, resultTimeoutInit};
