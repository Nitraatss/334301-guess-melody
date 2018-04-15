import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome} from '../js/welcome.js';
import {setPlayerInitialState} from '../js/player.js';

const resultTimeoutMarkup = `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
`;
const resultTimeoutClassName = `main main--result`;

const app = document.querySelector(`.app`);

const resultTimeout = {
  page: creatDOMElement(resultTimeoutMarkup, resultTimeoutClassName),
  init: () => {
    const onMainReplayClickTime = () => {
      setPlayerInitialState();
      showPage(welcome);
    };

    const mainReplayTime = app.querySelector(`.main-replay`);

    mainReplayTime.addEventListener(`click`, onMainReplayClickTime);
  }
};

export {resultTimeout};
