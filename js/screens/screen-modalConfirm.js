import App from '../application';

import ModalConfirmView from '../views/view-modalConfirm';

export default class ModalConfirmScreen {
  constructor() {
    this.content = new ModalConfirmView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }

  init() {
    this.content.onConfirm = () => App.showGreeting();

    this.content.onCancel = (modalWrapper) => {
      modalWrapper.classList.add(`modal-confirm__wrap--hidden`);
    };
  }
}
