import showPage from '../js/show-page.js';
import {welcome, onMainPlayClick} from '../js/welcome.js';

/* Формирование стартовой страницы */
const showWelcomePage = () => {
  showPage(welcome);

  const mainPlay = app.querySelector(`.main-play`);

  mainPlay.addEventListener(`click`, onMainPlayClick);
};

const app = document.querySelector(`.app`);

showWelcomePage();
