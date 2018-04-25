import {GamePage} from '../js/game-page';
import {WelcomeView} from '../js/welcome-view.js';

export class WelcomePage extends GamePage {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this.initGame();

    this.page = new WelcomeView();

    this.bind();
  }

  bind() {
    this.onMainPlayClick();
  }

  onMainPlayClick() {
    this.page.onMainPlayClick = () => {
      this.showRandomPage();
    };
  }
}
