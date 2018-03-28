(function () {
  let mainDOMElements = {
    app: document.querySelector(`.app`),
    mainSection: () => document.querySelector(`.app`).querySelector(`.main`),

    templates: document.querySelector(`#templates`).content,
    mainWelcome: document.querySelector(`#templates`).content.querySelector(`.main--welcome`),
    mainLevels: document.querySelector(`#templates`).content.querySelectorAll(`.main--level`),
    mainLevelGenre: document.querySelector(`#templates`).content.querySelector(`.main--level-genre`),
    mainLevelArtist: document.querySelector(`#templates`).content.querySelector(`.main--level-artist`),
    mainResults: document.querySelector(`#templates`).content.querySelectorAll(`.main--result`)
  };

  /* Массив с основными страницами сайта */

  const formPagesArray = (array) => {
    let i;

    array.push(mainDOMElements.app);
    array.push(mainDOMElements.mainWelcome);
    for (i = 0; i < mainDOMElements.mainLevels.length; i++) {
      array.push(mainDOMElements.mainLevels[i]);
    }
    for (i = 0; i < mainDOMElements.mainResults.length; i++) {
      array.push(mainDOMElements.mainResults[i]);
    }
  };

  /* Отображение определнной страницы */

  const showPage = (pageNumber) => {
    buffer = pages[pageNumber].cloneNode(true);

    mainDOMElements.app.removeChild(mainDOMElements.mainSection());
    mainDOMElements.app.insertBefore(buffer, mainDOMElements.app.firstChild);
  };

  /* Формирование стартовой страницы */

  const showWelcomePage = () => {
    showPage(1);
  };

  /* Переключение экранов по нажатию на клавиши */

  const onKeyDown = function (evtDown) {
    if (evtDown.altKey && evtDown.keyCode === RIGHTARROW_KEYCODE) {
      if (currentPage < (pages.length - 1)) {
        currentPage++;
        showPage(currentPage);
      }

      document.removeEventListener(`keydown`, onKeyDown);
      document.addEventListener(`keyup`, onKeyUp);
    } else if (evtDown.altKey && evtDown.keyCode === LEFTARROW_KEYCODE) {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }

      document.removeEventListener(`keydown`, onKeyDown);
      document.addEventListener(`keyup`, onKeyUp);
    }
  };

  const onKeyUp = function (evUp) {
    if (evUp.altKey || evUp.keyCode === RIGHTARROW_KEYCODE) {
      document.addEventListener(`keydown`, onKeyDown);
      document.removeEventListener(`keyup`, onKeyUp);
    }
  };

  const RIGHTARROW_KEYCODE = 39;
  const LEFTARROW_KEYCODE = 37;

  let pages = [];
  let buffer;
  let currentPage = 1;

  formPagesArray(pages);

  showWelcomePage();

  document.addEventListener(`keydown`, onKeyDown);

})();
