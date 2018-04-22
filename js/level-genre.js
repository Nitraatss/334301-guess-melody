import {LevelGenreView} from '../js/level-genre-view.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {gameData} from '../js/game.js';
import {timer} from '../js/timer.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {calculateAnswerTime} from '../js/calculate-answer-time.js';
import {app} from '../js/application';

export const levelGenre = (currentGame) => {
  const pageLevelGenre = new LevelGenreView(creatGenreQuestion(gameData), currentGame);

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
    const answerTime = calculateAnswerTime(pageLevelGenre.currentGame.state.timeLimit, timer.time);

    if (timer.time === 0) {
      pageLevelGenre.currentGame.setTimeLimit(timer.time);
      app.showResult();
    } if (!pageLevelGenre.checkAnswer(genreInputs, pageLevelGenre.genreQuestion, timer.time)) {
      pageLevelGenre.currentGame.addAnswerResults(setAnswerResults(false, answerTime));
      pageLevelGenre.currentGame.decreaseLives();
      pageLevelGenre.currentGame.setTimeLimit(timer.time);
    } else {
      pageLevelGenre.currentGame.addAnswerResults(setAnswerResults(true, answerTime));
      pageLevelGenre.currentGame.setTimeLimit(timer.time);
    }

    pageLevelGenre.removeEventListeners(genreAnswerSend, genreInputs);
    showRandomPage();
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
};

