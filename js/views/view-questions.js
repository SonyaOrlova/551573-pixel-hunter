import AbstractView from './abstract-view';
// templates
import statsBarTemplate from '../templates/template-statsBar';
// logic
import resizeImage from '../data/resize-image';

const getQuestionHTML = (param) => {
  const guestionHTML = {
    radio: `
    <div class="game__option" data-type="${param.type}" data-number="${param.index}">
      <img src="${param.src}" alt="Option ${param.index}">
      <label class="game__answer  game__answer--photo">
        <input name="question${param.index}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question${param.index}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`,
    point: `
    <div class="game__option" data-type="${param.type}">
      <img src="${param.src}" alt="Option 1">
    </div>`
  };

  return guestionHTML;
};

const questionInnerClass = {
  oneImage: `game__content  game__content--wide`,
  twoImages: `game__content`,
  threeImages: `game__content game__content--triple`
};

export default class QuestionView extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.gameState = gameState;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question.description}</p>
      <form class="${questionInnerClass[this.question.category]}">
        ${[...this.question.params].map((param) =>
    getQuestionHTML(param)[this.question.answerType]).join(``)}
      </form>
      ${statsBarTemplate(this.gameState)}
    </div>
    `;
  }

  onAnswer() { }
  onGameImageLoad(image) {

    image.parentNode.style.display = `block`;

    const frameSize = {
      width: image.parentNode.clientWidth,
      height: image.parentNode.clientHeight
    };

    const naturalSize = {
      width: image.naturalWidth,
      height: image.naturalHeight
    };

    const optimizedSize = resizeImage(frameSize, naturalSize);

    image.width = optimizedSize.width;
    image.height = optimizedSize.height;
  }

  bind() {

    const images = this.element.querySelectorAll(`.game__option > img`);
    images.forEach((image) => {
      image.parentNode.style.display = `none`;
      image.style.pointerEvents = `none`; // для firefox click
      image.addEventListener(`load`, () => {
        this.onGameImageLoad(image);
      });
    });

    const options = this.element.querySelectorAll(`.game__option`);
    const form = this.element.querySelector(`form`);

    switch (this.question.answerType) {
      case `radio`:

        form.addEventListener(`change`, () => {

          let answers = [];

          options.forEach((option) => {
            let optionValue = option.dataset.type;
            let versions = option.querySelectorAll(`input`);

            versions.forEach((version) => {
              if (version.checked) {
                let answerValue = version.value;
                answers.push(optionValue === answerValue);
              }
            });
          });

          if (options.length === answers.length) {
            this.onAnswer(answers);

          }
        }); break;

      case `point`:
        options.forEach((option) => {
          option.addEventListener(`click`, (evt) => {
            const target = evt.target;
            this.onAnswer(target);
          });
        }); break;
    }
  }
}
