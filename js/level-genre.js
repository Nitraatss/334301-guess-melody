import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {resultWin} from '../js/result-win.js';
import {resultZeroTries} from '../js/result-zerotries.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {actualPlayer} from '../js/player.js';
import {gameData, page, addPlayerResult} from '../js/game.js';
import {creatGenreQuestion} from '../js/creat-genre-question';
import {setAnswerResults} from '../js/calculate-score.js';

let genreQuestion;
let correctGenre;
let genreCorrectAnswer;
let genreIncorrectAnswers;

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
  let answerID = 1;

  genreQuestion = creatGenreQuestion(gameData);
  correctGenre = genreQuestion.genre;
  genreCorrectAnswer = genreQuestion.correctAnswer;
  genreIncorrectAnswers = genreQuestion.incorrectAnswers;

  let genreCorrectAnswerMarkup = `
      <div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio src="${genreCorrectAnswer.src}"></audio>
          <button class="player-control player-control--pause" type="button"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="${genreCorrectAnswer.genre}" id="a-${answerID}">
      <label class="genre-answer-check" for="a-${answerID}"></label>
    </div>
  `;

  let wrongAnswersMarkup = ``;

  for (let i = 0; i < genreIncorrectAnswers.length; i++) {
    answerID++;

    let wrongMarkup = `
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${genreIncorrectAnswers[i].src}"></audio>
            <button class="player-control player-control--play" type="button"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="${genreIncorrectAnswers[i].genre}" id="a-${answerID}">
        <label class="genre-answer-check" for="a-${answerID}"></label>
      </div>
    `;

    wrongAnswersMarkup = wrongAnswersMarkup + wrongMarkup;
  }

  return `
    ${time}
    ${mistake}

    <div class="main-wrap">
      <h2 class="title">Выберите ${correctGenre} треки</h2>
      <form class="genre">
        ${genreCorrectAnswerMarkup}

        ${wrongAnswersMarkup}

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  `;
};

const levelGenreClassName = `main main--level main--level-genre`;

const app = document.querySelector(`.app`);

const levelGenre = {
  page: () => creatDOMElement(levelGenreMarkup(timerMarkup, mistakes(actualPlayer.lives)), levelGenreClassName),
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
        addPlayerResult(actualPlayer.answersResuls, setAnswerResults(false, 31));
        actualPlayer.lives--;
      } else {
        addPlayerResult(actualPlayer.answersResuls, setAnswerResults(true, 31));
      }

      if (actualPlayer.lives <= 0) {
        removeEventListeners();

        page.number = 1;
        showPage(resultZeroTries);
      } else if (page.number < 10) {
        page.number = page.number + 1;
        removeEventListeners();
        showPage(levelGenre);
      } else {
        removeEventListeners();
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
