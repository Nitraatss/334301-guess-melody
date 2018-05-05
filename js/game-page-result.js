import GamePage from '../js/game-page';
import ResultView from '../js/result-view.js';

export default class ResultPage extends GamePage {
  constructor(model) {
    super(model);
    this._init();
  }

  _init() {
    this._stopTicking();

    this.page = new ResultView(this.model);

    this.page.onMainReplayClickTry = this.onMainReplayClickTry.bind(this);
  }

  onMainReplayClickTry() {
    this._initGame();

    this._showRandomPage();
  }
}
