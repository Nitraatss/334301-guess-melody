import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";

let className = `main main--level main--level-genre`;

export class LevelGenreView extends AbstractView {
  constructor(genreMarkup, onGenreAnswerSendClick, onGenreInputsChange, onPlayButtonClick) {
    super();
    this.genreMarkup = genreMarkup;
    this.onGenreAnswerSendClick = onGenreAnswerSendClick;
    this.onGenreInputsChange = onGenreInputsChange;
    this.onPlayButtonClick = onPlayButtonClick;
  }

  get template() {
    return this.genreMarkup;
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const genreAnswerSend = this._element.querySelector(`.genre-answer-send`);
    const genreInputs = this._element.querySelectorAll(`input`);
    const allAudioPlayers = this._element.querySelectorAll(`audio`);
    const audioPlayers = document.querySelectorAll(`.player`);

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
}
