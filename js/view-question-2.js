import AbstractView from './abstract-view.js';
import {questions, resize} from './game-data';
// templates
import headerLogoTemplate from './template-header-logo.js';
import headerTimerTemplate from './template-header-timer.js';
import headerLivesTemplate from './template-header-lives.js';
import flowStatsTemplate from './template-flowStats.js';
import footerTemplate from './template-footer.js';

const questionCategory = questions.find((question) => question.category === `twoImages`);

export default class Question2View extends AbstractView {
  constructor(gameStatus) {
    super();
    this.gameStatus = gameStatus;
  }

  get template() {
    return `
    <header class="header">
    ${headerLogoTemplate}
    ${headerTimerTemplate(this.gameStatus)}
    ${headerLivesTemplate(this.gameStatus)}
    </header>
      <div class="game">
        <p class="game__task">${questionCategory.description}</p>
        <form class="game__content">
          ${[...questionCategory.params].map((param) => `
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
          </div>
            `).join(``)}
        </form>
        ${flowStatsTemplate(this.gameStatus)}
      </div>
    ${footerTemplate}
    `;
  }

  onRadioChange() { }
  onLogoClick() { }
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

    const optimizedSize = resize(frameSize, naturalSize);

    image.width = optimizedSize.width;
    image.height = optimizedSize.height;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const options = this.element.querySelectorAll(`.game__option`);

    form.addEventListener(`click`, () => {
      this.onRadioChange(form, ...options);
    });

    const logoBtn = this.element.querySelector(`.back`);
    logoBtn.addEventListener(`click`, () => {
      this.onLogoClick();
    });

    const images = this.element.querySelectorAll(`.game__option > img`);
    images.forEach((image) => {
      image.parentNode.style.display = `none`;
      image.addEventListener(`load`, () => {
        this.onGameImageLoad(image);
      });
    });
  }
}

