import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";

const className = `main main--welcome`;

export class WelcomeView extends AbstractView {
  constructor(welcomeMarkup, onMainPlayClick) {
    super();
    this.welcomeMarkup = welcomeMarkup;
    this.onMainPlayClick = onMainPlayClick;
  }

  get template() {
    return this.welcomeMarkup;
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const mainPlay = this._element.querySelector(`.main-play`);


    mainPlay.addEventListener(`click`, () => {
      this.onMainPlayClick();
    });
  }
}
