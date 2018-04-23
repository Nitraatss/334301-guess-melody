import {LevelArtistView} from '../js/level-artist-view.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';

export const levelArtist = (currentGame) => {
  const levelArtistPage = new LevelArtistView(creatArtistQuestion(), currentGame);

  return levelArtistPage;
};
