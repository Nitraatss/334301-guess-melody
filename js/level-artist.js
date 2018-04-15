import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {levelGenre} from '../js/level-genre.js';
import {resultZeroTries} from '../js/result-zerotries.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {creatArtistQuestion} from '../js/creat-artist-question';
import {actualPlayer} from '../js/player.js';
import {page, addPlayerResult} from '../js/game.js';
import {setAnswerResults} from '../js/calculate-score.js';

let artistQuestion;
let correctArtistImg;
let correctArtistName;
let songLocation;
let wrongAnswers;

const checkAnswer = (answer, correctAnswer) => {
  if (answer === correctAnswer) {
    addPlayerResult(actualPlayer.answersResuls, setAnswerResults(true, 31));
  } else {
    addPlayerResult(actualPlayer.answersResuls, setAnswerResults(false, 31));
    actualPlayer.lives--;
  }
};

const levelArtistMarkup = (timer, mist) => {
  artistQuestion = creatArtistQuestion();
  correctArtistImg = artistQuestion.correctAnswer.image;
  correctArtistName = artistQuestion.correctAnswer.artist;
  songLocation = artistQuestion.correctAnswer.src;
  wrongAnswers = artistQuestion.incorrectAnswers;
  let answerID = 1;

  let correctAnswerMarkup = `
        <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${answerID}" name="answer" value="${correctArtistName}"/>
        <label class="main-answer" for="answer-${answerID}">
          <img class="main-answer-preview" src="${correctArtistImg}"
                alt="${correctArtistName}" width="134" height="134">
          ${correctArtistName}
        </label>
      </div>
  `;

  let wrongAnswersMarkup = ``;

  for (let i = 0; i < wrongAnswers.length; i++) {
    answerID++;

    let wrongMarkup = `<div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${answerID}" name="answer" value="${wrongAnswers[i].artist}"/>
        <label class="main-answer" for="answer-${answerID}">
          <img class="main-answer-preview" src="${wrongAnswers[i].image}"
                alt="${wrongAnswers[i].artist}" width="134" height="134">
          ${wrongAnswers[i].artist}
        </label>
      </div>`;

    wrongAnswersMarkup = wrongAnswersMarkup + wrongMarkup;
  }

  return `
  ${timer}
  ${mist}

  <div class="main-wrap">
    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper">
      <div class="player">
        <audio src="${songLocation}"></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <form class="main-list">
      ${correctAnswerMarkup}

      ${wrongAnswersMarkup}
    </form>
  </div>
  s`;
};

const levelArtistClassName = `main main--level main--level-artist`;

const app = document.querySelector(`.app`);

const levelArtist = {
  page: () => creatDOMElement(levelArtistMarkup(timerMarkup, mistakes(actualPlayer.lives)), levelArtistClassName),
  init: () => {
    const onMainAnswerClick = (evt) => {
      let currentAnswer;
      let correctAnswer = correctArtistName.replace(/\s+/g, ``);

      for (let i = 0; i < evt.path.length; i++) {
        if (evt.path[i].className === `main-answer-wrapper`) {
          currentAnswer = evt.path[i].innerText.replace(/\s+/g, ``);
          break;
        }
      }

      checkAnswer(currentAnswer, correctAnswer);

      if (actualPlayer.lives <= 0) {
        removeEventListeners();

        page.number = 1;
        showPage(resultZeroTries);
      } else if (page.number < 6) {
        removeEventListeners();
        page.number = page.number + 1;
        showPage(levelArtist);
      } else {
        removeEventListeners();

        showPage(levelGenre);
      }
    };

    const onPlayerControlClick = () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    const removeEventListeners = () => {
      mainAnswer.forEach((item) => {
        item.removeEventListener(`click`, onMainAnswerClick);
      });

      playerControl.removeEventListener(`click`, onPlayerControlClick);
    };

    const mainAnswer = app.querySelectorAll(`.main-answer`);
    const player = app.querySelector(`.player`);
    const playerControl = player.querySelector(`.player-control`);
    const audio = player.querySelector(`audio`);

    mainAnswer.forEach((item) => {
      item.addEventListener(`click`, onMainAnswerClick);
    });

    playerControl.addEventListener(`click`, onPlayerControlClick);
  }
};

export {levelArtist};
