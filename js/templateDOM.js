const creatDOMElement = (elementCode, elementClasses) => {
  let newElement;

  newElement = document.createElement(`section`);

  newElement.className = elementClasses.value;
  newElement.innerHTML = elementCode;

  return newElement;
};

const templates = document.querySelector(`#templates`).content;
const templatesPages = templates.querySelectorAll(`.main`);


export default creatDOMElement;

export {templatesPages};
