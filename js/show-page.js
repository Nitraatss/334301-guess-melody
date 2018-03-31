const app = document.querySelector(`.app`);

/* Отображение определьной страницы */
const showPage = (newPage) => {
  app.replaceChild(newPage, app.firstChild);
};

export default showPage;
