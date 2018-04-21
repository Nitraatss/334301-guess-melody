import {LevelArtistView} from '../js/level-artist-view.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';

export const levelArtist = () => {
  return new LevelArtistView(creatArtistQuestion());
};

