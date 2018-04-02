import showPage from '../js/show-page.js';
import {welcome, welcomeInit} from '../js/welcome.js';

/* Формирование стартовой страницы */
const showWelcomePage = () => {
  showPage(welcome);

  welcomeInit();
};

showWelcomePage();
