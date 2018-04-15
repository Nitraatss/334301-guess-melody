const app = document.querySelector(`.app`);

/* Отображение определьной страницы */
const showPage = ({page, init}) => {
  app.replaceChild(page(), app.querySelector(`.main`));

  init();
};

export default showPage;
