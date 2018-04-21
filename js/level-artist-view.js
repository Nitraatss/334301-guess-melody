import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {shuffleArray} from '../js/utils.js';
import {currentGame} from '../js/game-store.js';
import {DEFAULT_PLAYER_TIME} from '../js/game.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';

const className = `main main--level main--level-artist`;

export class LevelArtistView extends AbstractView {
  constructor(artistQuestion) {
    super();
    this.artistQuestion = artistQuestion;
  }

  get template() {
    let songLocation = this.artistQuestion.correctAnswer.src;
    let answerID = 0;


    let {correctAnswer, incorrectAnswers} = this.artistQuestion;
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
      ${formHeaderMarkup(timerMarkup, mistakes(currentGame.state.lives))}
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
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const mainAnswers = this._element.querySelectorAll(`.main-answer-r`);
    const playerControl = this._element.querySelector(`.player-control`);
    const audio = this._element.querySelector(`audio`);

    mainAnswers.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        this.onMainAnswerClick(evt, mainAnswers, playerControl);
      });
    });

    playerControl.addEventListener(`click`, () => {
      this.onPlayerControlClick(audio);
    });
  }

  checkAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
      currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
    } else {
      currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
      currentGame.decreaseLives();
    }
  }

  onPlayerControlClick(audio) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  onMainAnswerClick(evt, mainAnswers, playerControl) {
    let currentAnswer = evt.target.value;
    let correctAnswer = this.artistQuestion.correctAnswer.artist;

    this.checkAnswer(currentAnswer, correctAnswer);

    this.removeEventListeners(mainAnswers, playerControl);
    showRandomPage();
  }

  removeEventListeners(mainAnswers, playerControl) {
    mainAnswers.forEach((item) => {
      item.removeEventListener(`click`, this.onMainAnswerClick);
    });

    playerControl.removeEventListener(`click`, this.onPlayerControlClick);
  }
}
