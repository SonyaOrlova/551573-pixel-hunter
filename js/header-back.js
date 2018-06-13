import {createDomElement, renderScreen} from './util.js';
import greeting from './greeting.js';
import modalConfirm from './modal-confirm.js';

const backHeaderTemplate =
  `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  `;

const backHeader = (isGame) => {

  const backHeaderElement = createDomElement(backHeaderTemplate);

  const back = backHeaderElement.querySelector(`.back`);

  if (isGame) {
    back.addEventListener(`click`, () => renderScreen(modalConfirm()));
  } else {
    back.addEventListener(`click`, () => renderScreen(greeting()));
  }

  return backHeaderElement;
};

export default backHeader;
