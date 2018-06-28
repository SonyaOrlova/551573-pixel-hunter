import AbstractView from './abstract-view';
// templates
import statsBarTemplate from '../templates/template-stats-bar';
// logic
import renderImages from '../utils/render-images';
import renderDebug from '../utils/render-debug';

export default class QuestionViewChoose extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.gameState = gameState;

    this.answerCorrect = this.question.description === `Найдите рисунок среди изображений` ? `paint` : `photo`;
  }

  get template() {
    return `
    <div class="game">
    <p class="game__task">${this.question.description}</p>
    <form class="${this.question.inner}">
    ${[...this.question.answers].map((answer) => `
      <div class="game__option" data-type="${answer.class}">
      <img src="${answer.src}" alt="Option 1">
      </div>`).join(``)}
    </form>
    ${statsBarTemplate(this.gameState.answers)}
    </div>
    `;
  }

  onAnswer() { }
  onDebug(debug) {
    return debug ? renderDebug(this.element) : null;
  }

  bind() {

    renderImages(this.element); // отрисовка и ресайз

    const options = this.element.querySelectorAll(`.game__option`);
    options.forEach((option) => {

      // дебаггер
      const correctVersion = [...options].find((version) => version.dataset.type === this.answerCorrect);
      correctVersion.classList.add(`correct-answer`);

      // обработчик ответа
      option.addEventListener(`click`, (evt) => {
        const target = evt.target;
        const result = target.dataset.type === this.answerCorrect;

        this.onAnswer(result);
      });
    });
  }
}
