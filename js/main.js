import {welcome} from '../js/welcome.js';

/* Формирование стартовой страницы */
const showWelcomePage = () => {
  return welcome().element;
};

showWelcomePage();
