const app = document.querySelector(`.app`);

export const showPage = (page) => {
  const newPage = page;
  app.replaceChild(newPage.element, app.querySelector(`.main`));
};
