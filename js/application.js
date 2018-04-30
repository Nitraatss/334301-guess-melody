import {showPage} from '../js/show-page.js';
import {WelcomePage} from '../js/game-page-welcome.js';
import {GenrePage} from '../js/game-page-genre.js';
import {ArtistPage} from '../js/game-page-artist.js';
import {ResultPage} from '../js/game-page-result.js';
import {currentGame} from '../js/game-model.js';
import {loader} from '../js/game.js';

export default class Application {
  static showWelcome() {
    loader.loadQuestions().then(
        () => {
          const gamePage = new WelcomePage(currentGame);
          currentGame.state.questions = loader.questions;
          showPage(gamePage.element);
        }
    );
  }

  static showLevelArtist() {
    const gamePage = new ArtistPage(currentGame);
    showPage(gamePage.element);
  }

  static showLevelGenre() {
    const gamePage = new GenrePage(currentGame);
    showPage(gamePage.element);
  }

  static showResult() {
    const gamePage = new ResultPage(currentGame);
    showPage(gamePage.element);
  }
}
