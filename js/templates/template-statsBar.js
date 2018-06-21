import {gameConcept} from '../constants.js';

const renewAnswerIndicator = (answer) => {
  if (answer === undefined) {
    return `stats__result--unknown`;
  }
  if (!answer.isCorrect) {
    return `stats__result--wrong`;
  }
  if (answer.isFast) {
    return `stats__result--fast`;
  }
  if (answer.isSlow) {
    return `stats__result--slow`;
  }
  if (answer.isCorrect) {
    return `stats__result--correct`;
  } else {
    return null;
  }
};

const statsBarTemplate = (gameStatus) =>
  `
    <div class="stats">
      <ul class="stats">
      ${new Array(gameConcept.NUMBER_OF_GAMES).fill().map((it, i) =>`
      <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[i])}"></li>
      `).join(``)}
      </ul>
    </div>
  `;

export default statsBarTemplate;

