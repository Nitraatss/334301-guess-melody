import {welcome} from '../js/welcome.js';
import {finalResult} from '../js/result.js';
import {showPage} from '../js/show-page.js';
import {GamePage} from '../js/game-page.js';

class Application {
  showWelcome() {
    const gamePage = new GamePage(welcome);
    gamePage.init();
    showPage(gamePage.element);
  }

  showFirstLevel(level) {
    const gamePage = new GamePage(level);
    showPage(gamePage.element);
    gamePage.timerStart();
  }

  showLevel(level) {
    const gamePage = new GamePage(level);
    showPage(gamePage.element);
    gamePage.timerStop();
    gamePage.timerStart();
  }

  showResult() {
    const gamePage = new GamePage(finalResult);
    showPage(gamePage.element);
    gamePage.timerStop();

  }
}

export const app = new Application();
