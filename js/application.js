import {welcome} from '../js/welcome.js';
import {levelArtist} from '../js/level-artist.js';
import {levelGenre} from '../js/level-genre.js';
import {finalResult} from '../js/result.js';
import {showPage} from '../js/show-page.js';
import {GamePage} from '../js/game-page.js';

export default class Application {
  static showWelcome() {
    const gamePage = new GamePage(welcome);
    showPage(gamePage.element);
  }

  static showLevelArtist() {
    const gamePage = new GamePage(levelArtist);
    showPage(gamePage.element);
    gamePage.startTicking();
  }

  static showLevelGenre() {
    const gamePage = new GamePage(levelGenre);
    showPage(gamePage.element);
    gamePage.startTicking();
  }

  static showResult() {
    const gamePage = new GamePage(finalResult);
    showPage(gamePage.element);
  }
}
