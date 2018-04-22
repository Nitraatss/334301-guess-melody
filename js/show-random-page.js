import {getRandomInt} from '../js/utils.js';
import {MINIMUM_PLAYERS_LIVES} from '../js/game.js';
import {currentGame} from '../js/game-store.js';
import {levelGenre} from '../js/level-genre.js';
import {levelArtist} from '../js/level-artist.js';
import {app} from '../js/application.js';

const STARTING_INDEX = 1;
const ARTIST_PAGE_INDEX = 1;
const GENRE_PAGE_INDEX = 2;
const LAST_INDEX = 11;

export const showRandomPage = () => {
  if (currentGame.state.round === STARTING_INDEX) {
    currentGame.nextRound();

    let nextPageIndex = getRandomInt(ARTIST_PAGE_INDEX, GENRE_PAGE_INDEX);

    if (nextPageIndex === ARTIST_PAGE_INDEX) {
      app.showFirstLevel(levelArtist);
    } else {
      app.showFirstLevel(levelGenre);
    }
  } else if (currentGame.state.lives === MINIMUM_PLAYERS_LIVES) {
    app.showResult();
  } else if (currentGame.state.round < LAST_INDEX) {
    currentGame.nextRound();

    let nextPageIndex = getRandomInt(ARTIST_PAGE_INDEX, GENRE_PAGE_INDEX);

    if (nextPageIndex === ARTIST_PAGE_INDEX) {
      app.showLevel(levelArtist);
    } else {
      app.showLevel(levelGenre);
    }
  } else {
    app.showResult();
  }
};
