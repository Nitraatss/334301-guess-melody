import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {timer} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';

let className = `main main--level main--level-genre`;

export class LevelGenreView extends AbstractView {
  constructor(currentGame) {
    super();
    this.currentGame = currentGame;
  }

  get template() {
    let answerID = 0;

    let answersMakup = this.currentGame.state.curentQuestion.answers.map((item) => {
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
      ${formHeaderMarkup(timer.formMarkup(this.currentGame.state.timeLimit), mistakes(this.currentGame.state.lives))}

      <div class="main-wrap">
        <h2 class="title">${this.currentGame.state.curentQuestion.question}</h2>
        <form class="genre">
          ${answersMakup}

          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    `;
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const genreAnswerSend = this._element.querySelector(`.genre-answer-send`);
    const genreInputs = this._element.querySelectorAll(`input`);
    const allAudioPlayers = this._element.querySelectorAll(`audio`);
    const audioPlayers = this._element.querySelectorAll(`.player`);

    audioPlayers.forEach((item) => {
      let singleAudioPlayer = item.querySelector(`audio`);
      let playButton = item.querySelector(`.player-control`);

      playButton.addEventListener(`click`, () => {
        this.onPlayButtonClick(singleAudioPlayer, allAudioPlayers);
      });
    });

    genreAnswerSend.disabled = true;

    genreAnswerSend.addEventListener(`click`, () => {
      this.onGenreAnswerSendClick(genreInputs, genreAnswerSend);
    });

    genreInputs.forEach((item) => {
      item.addEventListener(`change`, () => {
        this.onGenreInputsChange(genreInputs, genreAnswerSend);
      });
    });
  }

  checkAnswer() {
  }

  onGenreInputsChange() {
  }

  onGenreAnswerSendClick() {
  }

  removeEventListeners() {
  }

  onPlayButtonClick() {
  }
}
