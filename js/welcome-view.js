import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";
import {showRandomPage} from '../js/show-random-page.js';

const className = `main main--welcome`;

export class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    `;
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

  onMainPlayClick() {
    showRandomPage();
  }
}
