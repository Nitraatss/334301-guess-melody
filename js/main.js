import showPage from '../js/show-page.js';
import {welcome} from '../js/welcome.js';

/* Формирование стартовой страницы */
const showWelcomePage = () => {
  showPage(welcome.page, welcome.init);
};

showWelcomePage();
