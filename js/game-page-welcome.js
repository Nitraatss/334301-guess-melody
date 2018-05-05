import GamePage from '../js/game-page';
import WelcomeView from '../js/welcome-view.js';

export default class WelcomePage extends GamePage {
  constructor(model) {
    super(model);
    this._init();
  }

  _init() {
    this._initGame();

    this.page = new WelcomeView();

    this.page.onMainPlayClick = this.onMainPlayClick.bind(this);
  }

  onMainPlayClick() {
    this._showRandomPage();
  }
}
