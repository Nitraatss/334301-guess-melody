import {GamePage} from '../js/game-page';
import {timer} from '../js/timer.js';
import Application from '../js/application.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {LevelArtistView} from '../js/level-artist-view.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';

export class ArtistPage extends GamePage {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this.page = new LevelArtistView(creatArtistQuestion(), this.model);

    this.page.checkAnswer = this.checkAnswer.bind(this);
    this.page.onPlayerControlClick = this.onPlayerControlClick.bind(this);
    this.page.onMainAnswerClick = this.onMainAnswerClick.bind(this);
    this.page.removeEventListeners = this.removeEventListeners.bind(this);

    this.startTicking();
  }

  bind() {
    this.checkAnswer();
    this.onPlayerControlClick();
    this.onMainAnswerClick();
    this.removeEventListeners();
  }

  checkAnswer(answer, correctAnswer, time) {
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
  }

  onPlayerControlClick(audio) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  onMainAnswerClick(evt, mainAnswers, playerControl) {
    let currentAnswer = evt.target.value;
    let correctAnswer = this.page.artistQuestion.correctAnswer.artist;

    this.page.checkAnswer(currentAnswer, correctAnswer, timer.time);

    this.page.removeEventListeners(mainAnswers, playerControl);
    this.showRandomPage();
  }

  removeEventListeners(mainAnswers, playerControl) {
    mainAnswers.forEach((item) => {
      item.removeEventListener(`click`, this.page.onMainAnswerClick);
    });

    playerControl.removeEventListener(`click`, this.page.onPlayerControlClick);
  }
}
