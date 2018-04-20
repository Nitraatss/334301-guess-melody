import {WelcomeView} from '../js/welcome-view.js';
import {showRandomPage} from '../js/show-random-page.js';

const onMainPlayClick = () => {
  showRandomPage();
};

const welcomeMarkup = `
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <button class="main-play">Начать игру</button>
  <h2 class="title main-title">Правила игры</h2>
  <p class="text main-text">
    Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
    Ошибиться можно 3 раза.<br>
    Удачи!
  </p>
`;

export const welcome = () => {
  return new WelcomeView(welcomeMarkup, onMainPlayClick);
};

