import creatDOMElement, {templatesPages} from '../js/templateDOM.js';
import showPage from '../js/show-page.js';
import {levelGenre, onGenreAnswerSendClick} from '../js/level-genre.js';

/* 2 Отображение страницы с жанром после выбора артиста */
const onMainAnswerClick = () => {
  /* Проверка отметки жанра */
  const onGenreInputsChange = (evtChange) => {
    if (evtChange.target.checked) {
      genreAnswerSend.disabled = false;
      check++;

      genreAnswerSend.addEventListener(`click`, onGenreAnswerSendClick);
    } else {
      check--;
      if (!check) {
        genreAnswerSend.disabled = true;
      }
    }
  };

  let check = 0;

  showPage(levelGenre);

  const genreAnswerSend = app.querySelector(`.genre-answer-send`);
  const genreInputs = app.querySelectorAll(`input`);

  genreAnswerSend.disabled = true;

  for (let i = 0; i < genreInputs.length; i++) {
    genreInputs[i].addEventListener(`change`, onGenreInputsChange);
  }
};

const app = document.querySelector(`.app`);

const levelArtist = creatDOMElement(templatesPages[2].innerHTML, templatesPages[2].classList);

export {levelArtist, onMainAnswerClick};
