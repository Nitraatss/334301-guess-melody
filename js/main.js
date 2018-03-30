(function () {
  const RIGHTARROW_KEYCODE = 39;
  const LEFTARROW_KEYCODE = 37;

  /* Отображение определьной страницы */
  const showPage = (pageNumber) => {
    buffer = templatesPages[pageNumber].cloneNode(true);

    app.replaceChild(buffer, app.firstChild);
  };

  /* Формирование стартовой страницы */
  const showWelcomePage = () => {
    showPage(0);
    currentPage = 0;
  };

  /* Переключение экранов по нажатию на клавиши */
  const onKeyDown = (evtDown) => {
    if (!evtDown.altKey) {
      return;
    }

    if (evtDown.keyCode === RIGHTARROW_KEYCODE) {
      if (currentPage < (templatesPages.length - 1)) {
        currentPage++;
        showPage(currentPage);
      }
    } else if (evtDown.keyCode === LEFTARROW_KEYCODE) {
      if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
      }
    }
  };

  const app = document.querySelector(`.app`);
  const templates = document.querySelector(`#templates`).content;
  const templatesPages = templates.querySelectorAll(`.main`);

  let buffer;
  let currentPage;

  showWelcomePage();

  document.addEventListener(`keydown`, onKeyDown);
})();
