import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {resultZeroTries, resultWin} from '../js/result.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {currentGame} from '../js/player.js';
import {gameData, page, formHeaderMarkup, DEFAULT_PLAYER_TIME} from '../js/game.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {setAnswerResults} from '../js/calculate-score.js';

let genreQuestion;
let correctGenre;

const checkAnswer = (inputs, correctAnswer) => {
  let answerResult = true;

  inputs.forEach((element) => {
    if (element.checked && element.value !== correctAnswer) {
      answerResult = false;
    }
  });

  return answerResult;
};

const levelGenreMarkup = (time, mistake) => {
  let answerID = 0;

  genreQuestion = creatGenreQuestion(gameData);
  correctGenre = genreQuestion.genre;

  let {correctAnswer, incorrectAnswers} = genreQuestion;

  let answersMakup = incorrectAnswers.concat(correctAnswer).map((item) => {
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

    const onPlayClick = (evt) => {
      if (evt.target.previousElementSibling.paused) {
        audio.forEach((item) => {
          item.pause();
        });

        evt.target.previousElementSibling.play();
      } else {
        evt.target.previousElementSibling.pause();
        evt.target.previousElementSibling.currentTime = 0;
      }
    };

    const onGenreAnswerSendClick = () => {
      if (!checkAnswer(genreInputs, correctGenre)) {
        currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
        currentGame.decreaseLives();
      } else {
        currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
      }

      removeEventListeners();
      if (currentGame.state.lives <= 0) {
        page.number = 1;
        showPage(resultZeroTries);
      } else if (page.number < 10) {
        page.number = page.number + 1;
        showPage(levelGenre);
      } else {
        showPage(resultWin);
      }
    };

    const removeEventListeners = () => {
      genreAnswerSend.removeEventListener(`click`, onGenreAnswerSendClick);

      genreInputs.forEach((item) => {
        item.removeEventListener(`change`, onGenreInputsChange);
      });

      playerControls.forEach((item) => {
        item.removeEventListener(`click`, onPlayClick);
      });
    };

    let check;

    const genreAnswerSend = app.querySelector(`.genre-answer-send`);
    const genreInputs = app.querySelectorAll(`input`);
    const playerControls = app.querySelectorAll(`.player-control`);
    const audio = app.querySelectorAll(`audio`);

    genreAnswerSend.disabled = true;

    genreAnswerSend.addEventListener(`click`, onGenreAnswerSendClick);

    genreInputs.forEach((item) => {
      item.addEventListener(`change`, onGenreInputsChange);
    });

    playerControls.forEach((item) => {
      item.addEventListener(`click`, onPlayClick);
    });
  }
};

export {levelGenre};
