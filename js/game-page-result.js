import GamePage from '../js/game-page';
import ResultView from '../js/result-view.js';

export default class ResultPage extends GamePage {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this.stopTicking();

    this.page = new ResultView(this.model);

    this.page.onMainReplayClickTry = this.onMainReplayClickTry.bind(this);
  }

  onMainReplayClickTry() {
    this.initGame();

    this.showRandomPage();
  }
}
