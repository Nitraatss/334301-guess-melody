import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {levelArtist} from '../js/level-artist.js';
import {showRandomPage} from '../js/show-random-page.js';

/* 1 отображение страницы с артистом при клике на плей */
const welcomeMarkup = `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
`;
const welcomeClassName = `main main--welcome`;

const app = document.querySelector(`.app`);

const welcome = {
  page: () => creatDOMElement(welcomeMarkup, welcomeClassName),
  init: () => {
    const onMainPlayClick = () => {
      showRandomPage();
      showPage(levelArtist);
    };

    const mainPlay = app.querySelector(`.main-play`);

    mainPlay.addEventListener(`click`, onMainPlayClick);
  }
};

export {welcome};
