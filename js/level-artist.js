import {LevelArtistView} from '../js/level-artist-view.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {timer} from '../js/timer.js';
import {calculateAnswerTime} from '../js/calculate-answer-time.js';
import {app} from '../js/application';

export const levelArtist = (currentGame) => {
  const levelArtistPage = new LevelArtistView(creatArtistQuestion(), currentGame);

  levelArtistPage.checkAnswer = (answer, correctAnswer, time) => {
    const answerTime = calculateAnswerTime(levelArtistPage.currentGame.state.timeLimit, timer.time);

    if (answer === correctAnswer && time > 0) {
      levelArtistPage.currentGame.addAnswerResults(setAnswerResults(true, answerTime));
      levelArtistPage.currentGame.setTimeLimit(time);
    } else if (time === 0) {
      levelArtistPage.currentGame.setTimeLimit(timer.time);
      app.showResult();
    } else {
      levelArtistPage.currentGame.addAnswerResults(setAnswerResults(false, answerTime));
      levelArtistPage.currentGame.decreaseLives();
      levelArtistPage.currentGame.setTimeLimit(time);
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

    levelArtistPage.checkAnswer(currentAnswer, correctAnswer, timer.time);

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
