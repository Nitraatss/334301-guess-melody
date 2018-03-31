import creatDOMElement, {templatesPages} from '../js/templateDOM.js';
import showPage from '../js/show-page.js';
import {welcome, onMainPlayClick} from '../js/welcome.js';

const resultWin = creatDOMElement(templatesPages[3].innerHTML, templatesPages[3].classList);

const onMainReplayClickWin = () => {
  showPage(welcome);

  const mainPlay = app.querySelector(`.main-play`);

  mainPlay.addEventListener(`click`, onMainPlayClick);
};

const app = document.querySelector(`.app`);

export {resultWin, onMainReplayClickWin};
