import {LevelGenreView} from '../js/level-genre-view.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {gameData} from '../js/game.js';

export const levelGenre = () => {
  return new LevelGenreView(creatGenreQuestion(gameData));
};

