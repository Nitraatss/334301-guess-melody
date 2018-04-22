import {ResultView} from '../js/result-view.js';
import {welcome} from '../js/welcome.js';
import {showPage} from '../js/show-page.js';
import {currentGame} from '../js/game-store.js';
const STARTING_INDEX = 1;

export const finalResult = () => {
  const pageResult = new ResultView(currentGame);

  pageResult.onMainReplayClickTry = () => {
    pageResult.currentGame.state.round = STARTING_INDEX;
    pageResult.currentGame.setInitialParams();
    showPage(welcome);
  };

  return pageResult;
};

