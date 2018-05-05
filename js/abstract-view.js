export default class AbstractView {
  constructor() {
  }

  get template() {
    throw new Error(`This method should be overriden`);
  }

  get element() {
    if (!this._element) {
      this.render();

      this.bind();
    }

    return this._element;
  }

  render() {
  }

  bind() {
  }
}
