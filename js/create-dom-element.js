export const creatDOMElement = (markup, className) => {
  const newElement = document.createElement(`section`);

  newElement.className = className;
  newElement.innerHTML = markup;

  return newElement;
};

