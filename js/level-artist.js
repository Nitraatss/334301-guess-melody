import {LevelArtistView} from '../js/level-artist-view.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';
import {DEFAULT_PLAYER_TIME} from '../js/game.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {currentGame} from '../js/game-store.js';


export const levelArtist = () => {
  const levelArtistPage = new LevelArtistView(creatArtistQuestion(), currentGame);

  levelArtistPage.checkAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      levelArtistPage.currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
    } else {
      levelArtistPage.currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
      levelArtistPage.currentGame.decreaseLives();
    }
  };

  levelArtistPage.onPlayerControlClick = (audio) => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  levelArtistPage.onMainAnswerClick = (evt, mainAnswers, playerControl) => {
    let currentAnswer = evt.target.value;
    let correctAnswer = levelArtistPage.artistQuestion.correctAnswer.artist;

    levelArtistPage.checkAnswer(currentAnswer, correctAnswer);

    levelArtistPage.removeEventListeners(mainAnswers, playerControl);
    showRandomPage();
  };

  levelArtistPage.removeEventListeners = (mainAnswers, playerControl) => {
    mainAnswers.forEach((item) => {
      item.removeEventListener(`click`, levelArtistPage.onMainAnswerClick);
    });

    playerControl.removeEventListener(`click`, levelArtistPage.onPlayerControlClick);
  };

  return levelArtistPage;
};

