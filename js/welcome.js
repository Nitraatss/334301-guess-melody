import creatDOMElement, {templatesPages} from '../js/templateDOM.js';
import showPage from '../js/show-page.js';
import {levelArtist, onMainAnswerClick} from '../js/level-artist.js';

/* 1 отображение страницы с артистом при клике на плей */
const onMainPlayClick = () => {
  let i;
  showPage(levelArtist);

  const mainAnswer = app.querySelectorAll(`.main-answer`);

  for (i = 0; i < mainAnswer.length; i++) {
    mainAnswer[i].addEventListener(`click`, onMainAnswerClick);
  }
};

const app = document.querySelector(`.app`);

const welcome = creatDOMElement(templatesPages[0].innerHTML, templatesPages[0].classList);

export {welcome, onMainPlayClick};
