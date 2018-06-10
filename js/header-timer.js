import {createDomElement} from './util.js';

const timerHeaderTemplate = (gameState) =>
  `
  <h1 class="game__timer">${gameState.time}</h1>
  `;

const timerHeader = (gameState) => {

  const timerHeaderElement = createDomElement(timerHeaderTemplate(gameState));

  return timerHeaderElement;
};

export default timerHeader;

