import AbstractView from './abstract-view.js';
import {questions, resize} from './game-data';
// templates
import headerLogoTemplate from './template-header-logo.js';
import headerTimerTemplate from './template-header-timer.js';
import headerLivesTemplate from './template-header-lives.js';
import flowStatsTemplate from './template-flowStats.js';
import footerTemplate from './template-footer.js';

const questionCategory = questions.find((question) => question.category === `threeImages`);

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

    image.parentNode.style.display = `block`;

    const frameSize = {
      width: image.parentNode.clientWidth,
      height: image.parentNode.clientHeight
    };

    const naturalSize = {
      width: image.naturalWidth,
      height: image.naturalHeight
    };

    image.width = resize(frameSize, naturalSize).width;
    image.height = resize(frameSize, naturalSize).height;

    image.parentNode.style.display = `block`;
  }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);

    options.forEach((option) => {
      option.style.display = `none`;
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
      image.parentNode.style.display = `none`;
      image.addEventListener(`load`, () => {
        this.onLoad(image);
      });
    });
  }
}

