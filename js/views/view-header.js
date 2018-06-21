import AbstractView from './abstract-view';

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  _logo() {
    return `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>`;
  }

  get template() {
    if (this.gameState) {
      return `
      <header class="header">
        ${this._logo()}
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
    } else {
      return `
      <header class="header">
        ${this._logo()}
      </header>`;
    }
  }

  onLogoClick() { }

  bind() {
    const logo = this.element.querySelector(`.back`);
    logo.addEventListener(`click`, () => this.onLogoClick());
  }
}
