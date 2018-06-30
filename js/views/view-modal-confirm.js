import AbstractView from './abstract-view';

export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal-confirm modal-confirm__wrap">
    <form class="modal-confirm__inner">
    <button class="modal-confirm__close" type="button">Закрыть</button>
    <h2 class="modal-confirm__title">Подтверждение</h2>
    <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
    <div class="modal-confirm__btn-wrap">
    <button class="modal-confirm__btn" data-select="ok">Ок</button>
    <button class="modal-confirm__btn" data-select="cancel">Отмена</button>
    </div>
    </form>
    </section>
    `;
  }

  onConfirm() { }
  onCancel() { }

  bind() {
    const confirmBtns = this.element.querySelectorAll(`.modal-confirm__btn`);
    let btnOk;
    let btnCancel;
    const btnClose = this.element.querySelector(`.modal-confirm__close`);

    confirmBtns.forEach((btn) => {
      switch (btn.dataset.select) {
        case `ok`: btnOk = btn; break;
        case `cancel`: btnCancel = btn; break;
      }
    });

    const modalWrapper = this.element.querySelector(`.modal-confirm__wrap`);
    const cancelHandler = (evt) => {
      evt.preventDefault();
      this.onCancel(modalWrapper);
    };

    btnCancel.addEventListener(`click`, cancelHandler);
    btnClose.addEventListener(`click`, cancelHandler);

    btnOk.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      this.onConfirm()
    });
  }
}
