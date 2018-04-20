import {creatDOMElement} from "../js/create-dom-element.js";
import {AbstractView} from '../js/abstract-view.js';

const className = `main main--result`;

export class ResultView extends AbstractView {
  constructor(resultMarkup, onMainReplayClickTry) {
    super();
    this.resultMarkup = resultMarkup;
    this.onMainReplayClickTry = onMainReplayClickTry;
  }

  get template() {
    return this.resultMarkup;
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const mainReplayTry = this._element.querySelector(`.main-replay`);

    mainReplayTry.addEventListener(`click`, () => {
      this.onMainReplayClickTry();
    });
  }
}
