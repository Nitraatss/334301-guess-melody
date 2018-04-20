import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";

const className = `main main--level main--level-artist`;

export class LevelArtistView extends AbstractView {
  constructor(artistMarkup, onMainAnswerClick, onPlayerControlClick) {
    super();
    this.artistMarkup = artistMarkup;
    this.onMainAnswerClick = onMainAnswerClick;
    this.onPlayerControlClick = onPlayerControlClick;
  }

  get template() {
    return this.artistMarkup;
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
}
