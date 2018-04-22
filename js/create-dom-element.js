export const creatDOMElement = (markup, className) => {
  let newElement;

  newElement = document.createElement(`section`);

  newElement.className = className;
  newElement.innerHTML = markup;

  return newElement;
};

