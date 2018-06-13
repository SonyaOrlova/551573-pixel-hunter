import {createDomElement, renderScreen} from './util.js';
import greeting from './greeting.js';

const modalConfirmTemplate =
  `
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

const modalConfirm = () => {

  const modalConfirmElement = createDomElement(modalConfirmTemplate);

  const confirmBtns = modalConfirmElement.querySelectorAll(`.modal-confirm__btn`);
  // const confirmBtnClose = modalConfirmElement.querySelectorAll(`.modal-confirm__close`);
  // let confirmBtnCancel;
  let confirmBtnOk;

  confirmBtns.forEach((btn) => {
    switch (btn.dataset.select) {
      case `ok`: confirmBtnOk = btn; break;
      // case `cancel`: confirmBtnCancel = btn; break;
    }
  });

  confirmBtnOk.addEventListener(`click`, () => renderScreen(greeting()));
  // закрытие пока не реализовала

  return modalConfirmElement;
};

export default modalConfirm;
