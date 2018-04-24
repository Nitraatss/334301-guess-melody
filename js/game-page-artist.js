import {GamePage} from '../js/game-page';
import {timer} from '../js/timer.js';
import Application from '../js/application.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {LevelArtistView} from '../js/level-artist-view.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';

export class ArtistPage extends GamePage {
  constructor(model) {
    super(model);
  }

  artist() {
    const levelArtistPage = new LevelArtistView(creatArtistQuestion(), this.model);

    levelArtistPage.checkAnswer = (answer, correctAnswer, time) => {
      const answerTime = this.model.state.timeLimit - timer.time;

      if (answer === correctAnswer && time > 0) {
        this.model.addAnswerResults(setAnswerResults(true, answerTime));
        this.model.setTimeLimit(time);
      } else if (time === 0) {
        this.model.setTimeLimit(timer.time);
        Application.showResult();
      } else {
        this.model.addAnswerResults(setAnswerResults(false, answerTime));
        this.model.decreaseLives();
        this.model.setTimeLimit(time);
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
      this.showRandomPage();
    };

    levelArtistPage.removeEventListeners = (mainAnswers, playerControl) => {
      mainAnswers.forEach((item) => {
        item.removeEventListener(`click`, levelArtistPage.onMainAnswerClick);
      });

      playerControl.removeEventListener(`click`, levelArtistPage.onPlayerControlClick);
    };

    return levelArtistPage;
  }
}
