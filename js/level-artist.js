import creatDOMElement from '../js/create-dom-element.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {creatArtistQuestion} from '../js/creat-artist-question';
import {currentGame} from '../js/game-store.js';
import {DEFAULT_PLAYER_TIME} from '../js/game.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {showRandomPage} from '../js/show-random-page.js';
import {shuffleArray} from '../js/utils.js';

let artistQuestion;
let correctArtistName;
let songLocation;

const checkAnswer = (answer, correctAnswer) => {
  if (answer === correctAnswer) {
    currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
  } else {
    currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
    currentGame.decreaseLives();
  }
};

const levelArtistMarkup = (timer, mist) => {
  artistQuestion = creatArtistQuestion();
  correctArtistName = artistQuestion.correctAnswer.artist;
  songLocation = artistQuestion.correctAnswer.src;
  let answerID = 0;


  let {correctAnswer, incorrectAnswers} = artistQuestion;
  let answersMakup = shuffleArray(incorrectAnswers.concat(correctAnswer)).map((item) => {
    answerID++;
    return `
        <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="answer-${answerID}" name="answer" value="${item.artist}"/>
        <label class="main-answer" for="answer-${answerID}">
          <img class="main-answer-preview" src="${item.image}"
                alt="${item.artist}" width="134" height="134">
          ${item.artist}
        </label>
      </div>
  `;
  }).join(` `);

  return `
  ${formHeaderMarkup(timer, mist)}

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
      ${answersMakup}
    </form>
  </div>
  s`;
};

const levelArtistClassName = `main main--level main--level-artist`;

const app = document.querySelector(`.app`);

const levelArtist = {
  page: () => creatDOMElement(levelArtistMarkup(timerMarkup, mistakes(currentGame.state.lives)), levelArtistClassName),
  init: () => {
    const onMainAnswerClick = (evt) => {
      let currentAnswer = evt.target.value;

      checkAnswer(currentAnswer, correctArtistName);

      removeEventListeners();
      showRandomPage();
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
      mainAnswers.forEach((item) => {
        item.removeEventListener(`click`, onMainAnswerClick);
      });

      playerControl.removeEventListener(`click`, onPlayerControlClick);
    };

    const mainAnswers = app.querySelectorAll(`.main-answer-r`);
    const player = app.querySelector(`.player`);
    const playerControl = player.querySelector(`.player-control`);
    const audio = player.querySelector(`audio`);

    mainAnswers.forEach((item) => {
      item.addEventListener(`click`, onMainAnswerClick);
    });

    playerControl.addEventListener(`click`, onPlayerControlClick);
  }
};

export {levelArtist};
