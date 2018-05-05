export default class AbstractView {
  constructor() {
  }

  get template() {
    throw new Error(`This method should be overriden`);
  }

  get element() {
    if (!this._element) {
      this._render();

      this._bind();
    }

    return this._element;
  }

  _render() {
  }

  _bind() {
  }
}
