import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {finalResult} from '../js/result.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {currentGame, ROUNDS} from '../js/player.js';
import {gameData, DEFAULT_PLAYER_TIME, MINIMUM_PLAYERS_LIVES} from '../js/game.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {setAnswerResults} from '../js/calculate-score.js';
import {shuffleArray} from '../js/shuffle-array.js';

let genreQuestion;
let correctGenre;

const checkAnswer = (inputs, correctAnswer) => {
  let trueAnswers = [];
  trueAnswers.push(correctAnswer);
  let answerResult = true;
  let checkedInputsCounter = 0;

  inputs.forEach((item) => {
    if (item.checked) {
      checkedInputsCounter++;
    }
  });

  if (trueAnswers.length === checkedInputsCounter) {
    for (const item of trueAnswers) {
      inputs.forEach((element) => {
        if (element.checked && element.value !== item) {
          answerResult = false;
        }
      });
    }
  }

  return answerResult;
};

const levelGenreMarkup = (time, mistake) => {
  let answerID = 0;

  genreQuestion = creatGenreQuestion(gameData);
  correctGenre = genreQuestion.genre;

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

const levelGenreClassName = `main main--level main--level-genre`;

const app = document.querySelector(`.app`);

const levelGenre = {
  page: () => creatDOMElement(levelGenreMarkup(timerMarkup, mistakes(currentGame.state.lives)), levelGenreClassName),
  init: () => {
    const onGenreInputsChange = () => {
      check = [...genreInputs].some((item) => item.checked === true);

      genreAnswerSend.disabled = !check;
    };

    const onGenreAnswerSendClick = () => {
      if (!checkAnswer(genreInputs, correctGenre)) {
        currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
        currentGame.decreaseLives();
      } else {
        currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
      }

      removeEventListeners();
      if (currentGame.state.lives === MINIMUM_PLAYERS_LIVES) {
        currentGame.state.round = ROUNDS.STARTING_INDEX;
        showPage(finalResult);
      } else if (currentGame.state.round < ROUNDS.LAST_INDEX) {
        currentGame.nextRound();
        showPage(levelGenre);
      } else {
        showPage(finalResult);
      }
    };

    const removeEventListeners = () => {
      genreAnswerSend.removeEventListener(`click`, onGenreAnswerSendClick);

      genreInputs.forEach((item) => {
        item.removeEventListener(`change`, onGenreInputsChange);
      });
    };

    let check;

    const genreAnswerSend = app.querySelector(`.genre-answer-send`);
    const genreInputs = app.querySelectorAll(`input`);
    const allAudioPlayers = app.querySelectorAll(`audio`);
    const audioPlayers = document.querySelectorAll(`.player`);

    audioPlayers.forEach((item) => {
      const onPlayButton = () => {
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

      let singleAudioPlayer = item.querySelector(`audio`);
      let playButton = item.querySelector(`.player-control`);

      playButton.addEventListener(`click`, onPlayButton);
    });

    genreAnswerSend.disabled = true;

    genreAnswerSend.addEventListener(`click`, onGenreAnswerSendClick);

    genreInputs.forEach((item) => {
      item.addEventListener(`change`, onGenreInputsChange);
    });
  }
};

export {levelGenre};
