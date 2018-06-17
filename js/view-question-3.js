import AbstractView from './abstract-view.js';
import {questions, resize} from './game-data';
// templates
import headerLogoTemplate from './template-header-logo.js';
import headerTimerTemplate from './template-header-timer.js';
import headerLivesTemplate from './template-header-lives.js';
import flowStatsTemplate from './template-flowStats.js';
import footerTemplate from './template-footer.js';

const questionCategory = questions.find((question) => question.category === `threeImages`);

const IMG_FRAME = {
  width: 304,
  height: 455
};

export default class Question3View extends AbstractView {
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
        <form class="game__content game__content--triple">
        ${[...questionCategory.params].map((param) => `
        <div class="game__option" data-type="${param.type}">
          <img src="${param.src}" alt="Option 1">
        </div>`).join(``)}
        </form>
        ${flowStatsTemplate(this.gameStatus)}
      </div>
    ${footerTemplate}
    `;
  }

  onImageClick() { }
  onLogoClick() { }
  onLoad(image) {

    const naturalSize = {
      width: image.naturalWidth,
      height: image.naturalHeight
    };

    image.width = resize(IMG_FRAME, naturalSize).width;
    image.height = resize(IMG_FRAME, naturalSize).height;

    image.style.display = `inline-block`;
  }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);

    options.forEach((option) => {
      option.querySelector(`img`).style.pointerEvents = `none`; // для firefox
      option.addEventListener(`click`, (evt) => {
        const target = evt.target;
        this.onImageClick(target);
      });
    });

    const logoBtn = this.element.querySelector(`.back`);
    logoBtn.addEventListener(`click`, () => {
      this.onLogoClick();
    });

    const images = this.element.querySelectorAll(`.game__option > img`);
    images.forEach((image) => {
      image.addEventListener(`load`, () => {
        this.onLoad(image);
      });
    });
  }
}

