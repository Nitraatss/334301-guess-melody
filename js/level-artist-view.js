import AbstractView from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";
import {timer} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';

const className = `main main--level main--level-artist`;

export default class LevelArtistView extends AbstractView {
  constructor(currentGame) {
    super();
    this.currentGame = currentGame;
  }

  get template() {
    let songLocation = this.currentGame.state.curentQuestion.src;
    let answerID = 0;

    let answersMakup = this.currentGame.state.curentQuestion.answers.map((item) => {
      answerID++;

      return `
            <div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${answerID}" name="answer" value="${item.title}"/>
            <label class="main-answer" for="answer-${answerID}">
              <img class="main-answer-preview" src="${item.image.url}"
                    alt="${item.title}" width="134" height="134">
              ${item.title}
            </label>
          </div>
      `;
    }).join(` `);

    return `
      ${formHeaderMarkup(timer.formMarkup(this.currentGame.state.timeLimit), mistakes(this.currentGame.state.lives))}
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

  checkAnswer() {
  }

  onPlayerControlClick() {
  }

  onMainAnswerClick() {
  }

  removeEventListeners() {
  }
}
