import creatDOMElement, {templatesPages} from '../js/templateDOM.js';
import showPage from '../js/show-page.js';
import {welcome, onMainPlayClick} from '../js/welcome.js';

const resultTimeout = creatDOMElement(templatesPages[4].innerHTML, templatesPages[4].classList);

const onMainReplayClickTime = () => {
  showPage(welcome);

  const mainPlay = app.querySelector(`.main-play`);

  mainPlay.addEventListener(`click`, onMainPlayClick);
};

const app = document.querySelector(`.app`);


export {resultTimeout, onMainReplayClickTime};
