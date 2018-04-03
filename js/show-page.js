const app = document.querySelector(`.app`);

/* Отображение определьной страницы */
const showPage = (pageObject) => {
  const {page: pageDOME, init: pageInit} = pageObject;

  app.replaceChild(pageDOME, app.firstChild);

  pageInit();
};

export default showPage;
