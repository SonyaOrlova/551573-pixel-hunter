import AbstractView from './abstract-view';
import {TimeLimits} from '../utils/constants';

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    if (this.gameState) {
      return `
      <header class="header">
        ${HeaderView.logo()}
        <h1 class="game__timer">${this.gameState.time}</h1>
        <div class="game__lives">
          ${new Array(3 - this.gameState.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
          .join(``)}
          ${new Array(this.gameState.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
          .join(``)}
        </div>
      </header>`;
    }
    return `
  <header class="header">
    ${HeaderView.logo()}
  </header>`;
  }

  static logo() {
    return `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>`;
  }

  onLogoClick() { }

  bind() {
    const logo = this.element.querySelector(`.back`);
    logo.addEventListener(`click`, () => this.onLogoClick());

    if (this.gameState) {
      const timer = this.element.querySelector(`.game__timer`);
      if (this.gameState.time <= TimeLimits.ALARM) {
        timer.classList.add(`game__timer-animation`);
      }
    }
  }
}
