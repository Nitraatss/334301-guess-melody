import creatDOMElement, {templatesPages} from '../js/templateDOM.js';
import showPage from '../js/show-page.js';
import {resultWin, onMainReplayClickWin} from '../js/result-win.js';
import {resultTimeout, onMainReplayClickTime} from '../js/result-timeout.js';
import {resultZeroTries, onMainReplayClickTry} from '../js/result-zerotries.js';

/* Вычисление случайного целого числа */
const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

/* 3 Отображение случайной страницы с результатами после выбора жанра*/
const onGenreAnswerSendClick = () => {
  const genreInputs = app.querySelectorAll(`input`);
  const random = randomInteger(1, 3);
  let i;

  for (i = 0; i < genreInputs.length; i++) {
    genreInputs[i].checked = false;
  }

  switch (random) {
    case 1:
      showPage(resultWin);
      const mainReplayWin = app.querySelector(`.main-replay`);
      mainReplayWin.addEventListener(`click`, onMainReplayClickWin);
      break;
    case 2:
      showPage(resultTimeout);
      const mainReplayTime = app.querySelector(`.main-replay`);
      mainReplayTime.addEventListener(`click`, onMainReplayClickTime);
      break;
    case 3:
      showPage(resultZeroTries);
      const mainReplayTry = app.querySelector(`.main-replay`);
      mainReplayTry.addEventListener(`click`, onMainReplayClickTry);
      break;
  }
};

const app = document.querySelector(`.app`);

const levelGenre = creatDOMElement(templatesPages[1].innerHTML, templatesPages[1].classList);

export {levelGenre, onGenreAnswerSendClick};
