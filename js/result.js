import {ResultView} from '../js/result-view.js';

export const finalResult = (currentGame) => {
  const pageResult = new ResultView(currentGame);

  return pageResult;
};

