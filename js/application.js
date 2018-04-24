import {showPage} from '../js/show-page.js';
import {WelcomePage} from '../js/game-page-welcome.js';
import {GenrePage} from '../js/game-page-genre.js';
import {ArtistPage} from '../js/game-page-artist.js';
import {ResultPage} from '../js/game-page-result.js';
import {currentGame} from '../js/game-model.js';

export default class Application {
  static showWelcome() {
    const gamePage = new WelcomePage(currentGame);
    showPage(gamePage.welcome());
  }

  static showLevelArtist() {
    const gamePage = new ArtistPage(currentGame);
    showPage(gamePage.artist());
    gamePage.startTicking();
  }

  static showLevelGenre() {
    const gamePage = new GenrePage(currentGame);
    showPage(gamePage.genre());
    gamePage.startTicking();
  }

  static showResult() {
    const gamePage = new ResultPage(currentGame);
    showPage(gamePage.result());
  }
}
