import GamePage from '../js/game-page';
import LevelGenreView from '../js/level-genre-view.js';
import Application from '../js/application.js';
import {timer} from '../js/timer.js';
import {setAnswerResults} from '../js/calculate-score.js';

export default class GenrePage extends GamePage {
  constructor(model) {
    super(model);
    this.init();
  }

  init() {
    this.page = new LevelGenreView(this.model);

    this.page.checkAnswer = this.checkAnswer.bind(this);
    this.page.onGenreInputsChange = this.onGenreInputsChange.bind(this);
    this.page.onGenreAnswerSendClick = this.onGenreAnswerSendClick.bind(this);
    this.page.removeEventListeners = this.removeEventListeners.bind(this);
    this.page.onPlayButtonClick = this.onPlayButtonClick.bind(this);
  }

  checkAnswer(inputs, correctAnswer, time) {
    let correctAnswerCounter = 0;
    let checkedInputsCounter = 0;
    let answerResult = true;

    inputs.forEach((element) => {
      if (element.value === correctAnswer) {
        correctAnswerCounter++;
      }

      if (element.checked) {
        checkedInputsCounter++;
      }
    });

    if (correctAnswerCounter === checkedInputsCounter && time > 0) {
      inputs.forEach((element) => {
        if (element.checked && element.value === correctAnswer) {
          answerResult = true;
        } else if (element.checked && element.value !== correctAnswer) {
          answerResult = false;
        }
      });
    }

    return answerResult;
  }

  onGenreInputsChange(genreInputs, genreAnswerSend) {
    let check = [...genreInputs].some((item) => item.checked === true);

    genreAnswerSend.disabled = !check;
  }

  onGenreAnswerSendClick(genreInputs, genreAnswerSend) {
    const answerTime = this.model.state.timeLimit - timer.time;

    if (timer.time <= 0) {
      this.model.state.timeLimit = timer.time;
      Application.showResult();
    } if (!this.page.checkAnswer(genreInputs, this.model.state.currentQuestion.genre, timer.time)) {
      this.model.addAnswerResults(setAnswerResults(false, answerTime));
      this.model.decreaseLives();
      this.model.state.timeLimit = timer.time;
    } else {
      this.model.addAnswerResults(setAnswerResults(true, answerTime));
      this.model.state.timeLimit = timer.time;
    }

    this.page.removeEventListeners(genreAnswerSend, genreInputs);
    this.showRandomPage();
  }

  removeEventListeners(genreAnswerSend, genreInputs) {
    genreAnswerSend.removeEventListener(`click`, this.page.onGenreAnswerSendClick);

    genreInputs.forEach((item) => {
      item.removeEventListener(`change`, this.page.onGenreInputsChange);
    });
  }

  onPlayButtonClick(singleAudioPlayer, allAudioPlayers) {
    if (singleAudioPlayer.paused) {
      allAudioPlayers.forEach((element) => {
        element.pause();
      });

      singleAudioPlayer.play();
    } else {
      singleAudioPlayer.pause();
      singleAudioPlayer.currentTime = 0;
    }
  }
}
