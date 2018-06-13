import {createDomElement} from './util.js';

const livesHeaderTemplate = (gameState) =>
  `
  <div class="game__lives">
      ${new Array(3 - gameState.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      ${new Array(gameState.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
  </div>
  `;

const livesHeader = (gameState) => {

  const livesHeaderElement = createDomElement(livesHeaderTemplate(gameState));

  return livesHeaderElement;
};

export default livesHeader;
