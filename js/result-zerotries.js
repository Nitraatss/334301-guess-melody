import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {welcome} from '../js/welcome.js';
import {actualPlayer, setPlayerInitialState} from '../js/player.js';

const resultZeroTriesMarkup = `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
`;
const resultZeroTriesClassName = `main main--result`;

const app = document.querySelector(`.app`);

const resultZeroTries = {
  page: () => creatDOMElement(resultZeroTriesMarkup, resultZeroTriesClassName),
  init: () => {
    const onMainReplayClickTry = () => {
      setPlayerInitialState(actualPlayer);
      showPage(welcome);
    };

    const mainReplayTry = app.querySelector(`.main-replay`);

    mainReplayTry.addEventListener(`click`, onMainReplayClickTry);
  }
};

export {resultZeroTries};
