import creatDOMElement, {templatesPages} from '../js/templateDOM.js';
import showPage from '../js/show-page.js';
import {welcome, onMainPlayClick} from '../js/welcome.js';

const onMainReplayClickTry = () => {
  showPage(welcome);

  const mainPlay = app.querySelector(`.main-play`);

  mainPlay.addEventListener(`click`, onMainPlayClick);
};

const app = document.querySelector(`.app`);

const resultZeroTries = creatDOMElement(templatesPages[5].innerHTML, templatesPages[5].classList);

export {resultZeroTries, onMainReplayClickTry};
