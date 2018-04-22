import {ResultView} from '../js/result-view.js';
import {currentGame} from '../js/game-store.js';
import {app} from '../js/application';

export const finalResult = () => {
  const pageResult = new ResultView(currentGame);

  pageResult.onMainReplayClickTry = () => {
    app.showWelcome();
  };

  return pageResult;
};

