import {LevelGenreView} from '../js/level-genre-view.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {shuffleArray} from '../js/utils.js';
import {currentGame} from '../js/game-store.js';
import {gameData, DEFAULT_PLAYER_TIME} from '../js/game.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {creatGenreQuestion} from '../js/creat-genre-question';

let genreQuestion;

const levelGenreMarkup = (time, mistake) => {
  let answerID = 0;
  genreQuestion = creatGenreQuestion(gameData);

  let correctGenre = genreQuestion.genre;

  let {correctAnswer, incorrectAnswers} = genreQuestion;

  let answersMakup = shuffleArray(incorrectAnswers.concat(correctAnswer)).map((item) => {
    answerID++;
    return `
      <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio src="${item.src}"></audio>
          <button class="player-control player-control--pause" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="${item.genre}" id="a-${answerID}">
      <label class="genre-answer-check" for="a-${answerID}"></label>
    </div>
  `;
  }).join(` `);

  return `
    ${formHeaderMarkup(time, mistake)}

    <div class="main-wrap">
      <h2 class="title">Выберите ${correctGenre} треки</h2>
      <form class="genre">
        ${answersMakup}

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  `;
};

const formLevelGenreMarkup = () => {
  return levelGenreMarkup(timerMarkup, mistakes(currentGame.state.lives));
};

const checkAnswer = (inputs, correctAnswer) => {
  let trueAnswers = [];
  trueAnswers.push(correctAnswer);
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

const onGenreInputsChange = (genreInputs, genreAnswerSend) => {
  check = [...genreInputs].some((item) => item.checked === true);

  genreAnswerSend.disabled = !check;
};

const onGenreAnswerSendClick = (genreInputs, genreAnswerSend) => {
  if (!checkAnswer(genreInputs, genreQuestion)) {
    currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
    currentGame.decreaseLives();
  } else {
    currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
  }

  removeEventListeners(genreAnswerSend, genreInputs);
  showRandomPage();
};

const removeEventListeners = (genreAnswerSend, genreInputs) => {
  genreAnswerSend.removeEventListener(`click`, onGenreAnswerSendClick);

  genreInputs.forEach((item) => {
    item.removeEventListener(`change`, onGenreInputsChange);
  });
};

const onPlayButtonClick = (singleAudioPlayer, allAudioPlayers) => {
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

let check;

export const levelGenre = () => {
  return new LevelGenreView(formLevelGenreMarkup(), onGenreAnswerSendClick, onGenreInputsChange, onPlayButtonClick);
};

