export default class AbstractView {
  constructor() {
    this.app = document.querySelector(`.app`);
  }

  get template() {}

  render() {
    let newElement;

    newElement = document.createElement(`section`);

    newElement.className = this.className;
    newElement.innerHTML = this.template;

    return newElement;
  }

  bind() {}

  get element() {
    this.app.replaceChild(this.render(), this.app.querySelector(`.main`));

    this.bind();
  }
}
