import {LevelGenreView} from '../js/level-genre-view.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {gameData} from '../js/game.js';
import {currentGame} from '../js/game-store.js';
import {DEFAULT_PLAYER_TIME} from '../js/game.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';

export const levelGenre = () => {
  const pageLevelGenre = new LevelGenreView(creatGenreQuestion(gameData), currentGame);

  pageLevelGenre.checkAnswer = (inputs, correctAnswer) => {
    let trueAnswers = [];
    trueAnswers.push(correctAnswer.genre);
    let answerResult = false;
    let checkedInputsCounter = 0;

    inputs.forEach((item) => {
      if (item.checked) {
        checkedInputsCounter++;
      }
    });

    if (trueAnswers.length === checkedInputsCounter) {
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
    if (!pageLevelGenre.checkAnswer(genreInputs, pageLevelGenre.genreQuestion)) {
      pageLevelGenre.currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
      pageLevelGenre.currentGame.decreaseLives();
    } else {
      pageLevelGenre.currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
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

