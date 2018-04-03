import {getRandomInt} from '../js/utils.js';
import creatDOMElement from '../js/create-dom-element.js';
import showPage from '../js/show-page.js';
import {resultWin} from '../js/result-win.js';
import {resultTimeout} from '../js/result-timeout.js';
import {resultZeroTries} from '../js/result-zerotries.js';

const RESULT_WIN_SCREEN_INDEX = 1;
const RESULT_LOST_TIME_SCREEN_INDEX = 2;
const RESULT_LOST_TRIES_SCREEN_INDEX = 3;

/* 3 Отображение случайной страницы с результатами после выбора жанра*/
const levelGenreMarkup = `
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">05</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">00</span>
    </div>
  </svg>
  <div class="main-mistakes">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
  </div>

  <div class="main-wrap">
    <h2 class="title">Выберите инди-рок треки</h2>
    <form class="genre">
      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-1">
        <label class="genre-answer-check" for="a-1"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-2">
        <label class="genre-answer-check" for="a-2"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-3">
        <label class="genre-answer-check" for="a-3"></label>
      </div>

      <div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio></audio>
            <button class="player-control player-control--play"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <input type="checkbox" name="answer" value="answer-1" id="a-4">
        <label class="genre-answer-check" for="a-4"></label>
      </div>

      <button class="genre-answer-send" type="submit">Ответить</button>
    </form>
  </div>
`;
const levelGenreClassName = `main main--level main--level-genre`;

const app = document.querySelector(`.app`);

const levelGenre = {
  page: creatDOMElement(levelGenreMarkup, levelGenreClassName),
  init: () => {
    /* Проверка отметки жанра */
    const onGenreInputsChange = () => {
      check = [...genreInputs].some((item) => item.checked === true);

      genreAnswerSend.disabled = !check;
    };

    const onGenreAnswerSendClick = () => {
      const random = getRandomInt(1, 3);

      genreInputs.forEach((item) => {
        item.checked = false;
      });

      switch (random) {
        case RESULT_WIN_SCREEN_INDEX:
          showPage(resultWin);
          break;
        case RESULT_LOST_TIME_SCREEN_INDEX:
          showPage(resultTimeout);
          break;
        case RESULT_LOST_TRIES_SCREEN_INDEX:
          showPage(resultZeroTries);
          break;
      }
    };

    let check;

    const genreAnswerSend = app.querySelector(`.genre-answer-send`);
    const genreInputs = app.querySelectorAll(`input`);

    genreAnswerSend.disabled = true;

    genreAnswerSend.addEventListener(`click`, onGenreAnswerSendClick);

    genreInputs.forEach((item) => {
      item.addEventListener(`change`, onGenreInputsChange);
    });
  }
};

export {levelGenre};
