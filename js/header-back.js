import {createDomElement, renderScreen} from './util.js';
import greeting from './greeting.js';

const backHeaderTemplate =
  `
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  `;

const backHeader = () => {

  const backHeaderElement = createDomElement(backHeaderTemplate);

  const back = backHeaderElement.querySelector(`.back`);
  back.addEventListener(`click`, () => renderScreen(greeting()));

  return backHeaderElement;
};

export default backHeader;
