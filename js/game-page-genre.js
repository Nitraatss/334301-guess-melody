import {GamePage} from '../js/game-page';
import {timer} from '../js/timer.js';
import {LevelGenreView} from '../js/level-genre-view.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {gameData} from '../js/game.js';
import Application from '../js/application.js';
import {setAnswerResults} from '../js/calculate-score.js';

export class GenrePage extends GamePage {
  constructor(model) {
    super(model);
  }

  genre() {
    const pageLevelGenre = new LevelGenreView(creatGenreQuestion(gameData), this.model);

    pageLevelGenre.checkAnswer = (inputs, correctAnswer, time) => {
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

    pageLevelGenre.onGenreInputsChange = (genreInputs, genreAnswerSend) => {
      let check = [...genreInputs].some((item) => item.checked === true);

      genreAnswerSend.disabled = !check;
    };

    pageLevelGenre.onGenreAnswerSendClick = (genreInputs, genreAnswerSend) => {
      const answerTime = this.model.state.timeLimit - timer.time;

      if (timer.time === 0) {
        this.model.setTimeLimit(timer.time);
        Application.showResult();
      } if (!pageLevelGenre.checkAnswer(genreInputs, pageLevelGenre.genreQuestion, timer.time)) {
        this.model.addAnswerResults(setAnswerResults(false, answerTime));
        this.model.decreaseLives();
        this.model.setTimeLimit(timer.time);
      } else {
        this.model.addAnswerResults(setAnswerResults(true, answerTime));
        this.model.setTimeLimit(timer.time);
      }

      pageLevelGenre.removeEventListeners(genreAnswerSend, genreInputs);
      this.showRandomPage();
    };

    pageLevelGenre.removeEventListeners = (genreAnswerSend, genreInputs) => {
      genreAnswerSend.removeEventListener(`click`, pageLevelGenre.onGenreAnswerSendClick);

      genreInputs.forEach((item) => {
        item.removeEventListener(`change`, pageLevelGenre.onGenreInputsChange);
      });
    };

    pageLevelGenre.onPlayButtonClick = (singleAudioPlayer, allAudioPlayers) => {
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

    return pageLevelGenre;
  }
}
