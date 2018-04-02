const app = document.querySelector(`.app`);

/* Отображение определьной страницы */
const showPage = (newPage, pageInit) => {
  app.replaceChild(newPage, app.firstChild);

  pageInit();
};

export default showPage;
