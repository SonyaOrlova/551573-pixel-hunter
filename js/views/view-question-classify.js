import AbstractView from './abstract-view';
// templates
import statsBarTemplate from '../templates/template-stats-bar';
// logic
import renderImages from '../utils/render-images';

export default class QuestionViewClassify extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.gameState = gameState;
  }

  get template() {
    return `
    <div class="game">
    <p class="game__task">${this.question.description}</p>
    <form class="${this.question.inner}">
    ${[...this.question.answers].map((answer, index) => `
      <div class="game__option" data-type="${answer.class}">
      <img src="${answer.src}" alt="Option ${index + 1}">
      <label class="game__answer  game__answer--photo">
      <input name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
      <input name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
      </label>
      </div>
      `).join(``)}
    </form>
    ${statsBarTemplate(this.gameState.answers)}
    </div>
    `;
  }

  onAnswer() { }
  onDebug(debug) {
    if (debug) {
      const correctAnswers = this.element.querySelectorAll(`.correct-answer`);
      correctAnswers.forEach((correctAnswer) => {
        correctAnswer.style.outline = `10px solid green`;
      });
    }
  }

  bind() {

    const images = this.element.querySelectorAll(`.game__option > img`);
    renderImages(images); // отрисовка и ресайз

    let answers = [];

    const options = this.element.querySelectorAll(`.game__option`);
    options.forEach((option) => {
      let optionValue = option.dataset.type;
      let versions = option.querySelectorAll(`input`);

      // дебаггер
      let correctVersion = [...versions].find((version) => version.value === optionValue);
      let correctVersionBtn = correctVersion.parentNode.querySelector(`span`);
      correctVersionBtn.classList.add(`correct-answer`);

      // обработчик ответа
      option.addEventListener(`click`, () => {
        versions.forEach((version) => {
          if (version.checked) {
            let answerValue = version.value;
            answers.push(optionValue === answerValue);
          }
        });
        if (options.length === answers.length) {
          const result = !answers.includes(false);
          this.onAnswer(result);
        }
      });
    });
  }
}


