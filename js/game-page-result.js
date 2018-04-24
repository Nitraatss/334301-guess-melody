import {GamePage} from '../js/game-page';
import Application from '../js/application.js';
import {ResultView} from '../js/result-view.js';

export class ResultPage extends GamePage {
  constructor(model) {
    super(model);
  }

  result() {
    const pageResult = new ResultView(this.model);

    pageResult.onMainReplayClickTry = () => {
      Application.showWelcome();
    };

    return pageResult;
  }
}
