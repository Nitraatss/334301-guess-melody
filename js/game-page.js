import {currentGame} from '../js/game-model.js';
import {timer} from '../js/timer.js';
import {getRandomInt} from '../js/utils.js';
import {MINIMUM_PLAYERS_LIVES} from '../js/game.js';
import {setAnswerResults} from '../js/calculate-score.js';
import Application from '../js/application.js';
import {WelcomeView} from '../js/welcome-view.js';
import {LevelGenreView} from '../js/level-genre-view.js';
import {LevelArtistView} from '../js/level-artist-view.js';

const ARTIST_PAGE_INDEX = 1;
const GENRE_PAGE_INDEX = 2;
const LAST_INDEX = 11;

export class GamePage {
  constructor(model) {
    this.model = model(currentGame);
    this.init();
  }

  init() {
    if (this.model instanceof WelcomeView) {
      this.initGame();
      this.welcomeInit();
    } else if (this.model instanceof LevelGenreView) {
      this.genreInit();
    } else if (this.model instanceof LevelArtistView) {
      this.artistInit();
    } else {
      this.resultInit();
    }
  }

  welcomeInit() {
    this.initGame();

    this.model.onMainPlayClick = () => {
      this.showRandomPage();
    };
  }

  initGame() {
    currentGame.setInitialParams();

    timer.timeLimit = currentGame.state.timeLimit;
  }

  genreInit() {
    this.model.checkAnswer = (inputs, correctAnswer, time) => {
      let trueAnswers = [];
      trueAnswers.push(correctAnswer.genre);
      let answerResult = false;
      let checkedInputsCounter = 0;

      inputs.forEach((item) => {
        if (item.checked) {
          checkedInputsCounter++;
        }
      });

      if (trueAnswers.length === checkedInputsCounter && time > 0) {
        inputs.forEach((element) => {
          if (element.checked && trueAnswers.indexOf(element.value) > -1) {
            answerResult = true;
          }
        });
      }

      return answerResult;
    };

    this.model.onGenreInputsChange = (genreInputs, genreAnswerSend) => {
      let check = [...genreInputs].some((item) => item.checked === true);

      genreAnswerSend.disabled = !check;
    };

    this.model.onGenreAnswerSendClick = (genreInputs, genreAnswerSend) => {
      const answerTime = this.model.currentGame.state.timeLimit - timer.time;

      if (timer.time === 0) {
        this.model.currentGame.setTimeLimit(timer.time);
        Application.showResult();
      } if (!this.model.checkAnswer(genreInputs, this.model.genreQuestion, timer.time)) {
        this.model.currentGame.addAnswerResults(setAnswerResults(false, answerTime));
        this.model.currentGame.decreaseLives();
        this.model.currentGame.setTimeLimit(timer.time);
      } else {
        this.model.currentGame.addAnswerResults(setAnswerResults(true, answerTime));
        this.model.currentGame.setTimeLimit(timer.time);
      }

      this.model.removeEventListeners(genreAnswerSend, genreInputs);
      this.showRandomPage();
    };

    this.model.removeEventListeners = (genreAnswerSend, genreInputs) => {
      genreAnswerSend.removeEventListener(`click`, this.model.onGenreAnswerSendClick);

      genreInputs.forEach((item) => {
        item.removeEventListener(`change`, this.model.onGenreInputsChange);
      });
    };

    this.model.onPlayButtonClick = (singleAudioPlayer, allAudioPlayers) => {
      if (singleAudioPlayer.paused) {
        allAudioPlayers.forEach((element) => {
          element.pause();
        });

        singleAudioPlayer.play();
      } else {
        singleAudioPlayer.pause();
        singleAudioPlayer.currentTime = 0;
      }
    };
  }

  artistInit() {
    this.model.checkAnswer = (answer, correctAnswer, time) => {
      const answerTime = this.model.currentGame.state.timeLimit - timer.time;

      if (answer === correctAnswer && time > 0) {
        this.model.currentGame.addAnswerResults(setAnswerResults(true, answerTime));
        this.model.currentGame.setTimeLimit(time);
      } else if (time === 0) {
        this.model.currentGame.setTimeLimit(timer.time);
        Application.showResult();
      } else {
        this.model.currentGame.addAnswerResults(setAnswerResults(false, answerTime));
        this.model.currentGame.decreaseLives();
        this.model.currentGame.setTimeLimit(time);
      }
    };

    this.model.onPlayerControlClick = (audio) => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    this.model.onMainAnswerClick = (evt, mainAnswers, playerControl) => {
      let currentAnswer = evt.target.value;
      let correctAnswer = this.model.artistQuestion.correctAnswer.artist;

      this.model.checkAnswer(currentAnswer, correctAnswer, timer.time);

      this.model.removeEventListeners(mainAnswers, playerControl);
      this.showRandomPage();
    };

    this.model.removeEventListeners = (mainAnswers, playerControl) => {
      mainAnswers.forEach((item) => {
        item.removeEventListener(`click`, this.model.onMainAnswerClick);
      });

      playerControl.removeEventListener(`click`, this.model.onPlayerControlClick);
    };
  }

  resultInit() {
    this.model.onMainReplayClickTry = () => {
      Application.showWelcome();
    };
  }

  showRandomPage() {
    this.stopTicking();
    if (currentGame.state.lives === MINIMUM_PLAYERS_LIVES) {
      Application.showResult();
    } else if (currentGame.state.round < LAST_INDEX) {
      currentGame.nextRound();

      let nextPageIndex = getRandomInt(ARTIST_PAGE_INDEX, GENRE_PAGE_INDEX);

      if (nextPageIndex === ARTIST_PAGE_INDEX) {
        Application.showLevelArtist();
      } else {
        Application.showLevelGenre();
      }
    } else {
      Application.showResult();
    }
  }

  startTicking() {
    this.interval = setInterval(
        () => {
          if (timer.time) {
            timer.time--;
            timer.updateTimerMinutes();
            timer.updateTimerSeconds();
          } else {
            timer.updateTimerMinutes();
            timer.updateTimerSeconds();
            clearInterval(this.interval);
          }
        }, 1000
    );
  }

  stopTicking() {
    clearInterval(this.interval);
  }

  get element() {
    return this.model;
  }
}
