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
    if (evtDown.altKey && evtDown.keyCode === RIGHTARROW_KEYCODE) {
      if (currentPage < (templatesPages.length - 1)) {
        currentPage++;
        showPage(currentPage);
      }
    } else if (evtDown.altKey && evtDown.keyCode === LEFTARROW_KEYCODE) {
      if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
      }
    }
  };

  let app = document.querySelector(`.app`);
  let templates = document.querySelector(`#templates`).content;
  let templatesPages = templates.querySelectorAll(`.main`);
  let buffer;
  let currentPage;

  showWelcomePage();

  document.addEventListener(`keydown`, onKeyDown);
})();
