import createDomElement from '../utils/create-element.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  } // запрещает создавать базовый класс, без наследования

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.createDomElement();
    this.bind(this._element);
    return this._element;
  }

  createDomElement() {
    return createDomElement(this.template);
  }

  bind() {
    // bind handlers if required
  }
}
