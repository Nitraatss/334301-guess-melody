import {GamePage} from '../js/game-page';
import {WelcomeView} from '../js/welcome-view.js';

export class WelcomePage extends GamePage {
  constructor(model) {
    super(model);
  }

  welcome() {
    this.initGame();

    const welcomePage = new WelcomeView();

    welcomePage.onMainPlayClick = () => {
      this.showRandomPage();
    };

    return welcomePage;
  }
}
