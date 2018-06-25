import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal-error modal-error__wrap">
      <div class="modal-error__inner">
        <h2 class="modal-error__title">Произошла ошибка!</h2>
        <p class="modal-error__text">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
      </div>
    </section>
    `;
  }
}
