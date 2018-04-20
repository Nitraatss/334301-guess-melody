import {LevelArtistView} from '../js/level-artist-view.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {shuffleArray} from '../js/utils.js';
import {creatArtistQuestion} from '../js/creat-artist-question.js';
import {currentGame} from '../js/game-store.js';
import {DEFAULT_PLAYER_TIME} from '../js/game.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';

let artistQuestion;

const checkAnswer = (answer, correctAnswer) => {
  if (answer === correctAnswer) {
    currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
  } else {
    currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
    currentGame.decreaseLives();
  }
};

const onPlayerControlClick = (audio) => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
};

const onMainAnswerClick = (evt, mainAnswers, playerControl) => {
  let currentAnswer = evt.target.value;
  let correctAnswer = artistQuestion.correctAnswer.artist;

  checkAnswer(currentAnswer, correctAnswer);

  removeEventListeners(mainAnswers, playerControl);
  showRandomPage();
};

const removeEventListeners = (mainAnswers, playerControl) => {
  mainAnswers.forEach((item) => {
    item.removeEventListener(`click`, onMainAnswerClick);
  });

  playerControl.removeEventListener(`click`, onPlayerControlClick);
};

const levelArtistMarkup = (timer, mistake) => {
  artistQuestion = creatArtistQuestion();
  let songLocation = artistQuestion.correctAnswer.src;
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
    ${formHeaderMarkup(timer, mistake)}

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
  `;
};

export const levelArtist = () => {
  return new LevelArtistView(levelArtistMarkup(timerMarkup, mistakes(currentGame.state.lives)), onMainAnswerClick, onPlayerControlClick);
};

