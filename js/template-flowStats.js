import {NUMBER_OF_GAMES} from './game-data.js';

const renewAnswerIndicator = (answer) => {
  if (answer === undefined) {
    return `stats__result--unknown`;
  }
  if (!answer.isCorrect) {
    return `stats__result--wrong`;
  }
  if (answer.isCorrect) {
    return `stats__result--correct`;
  }
  if (answer.isFast) {
    return `stats__result--fast`;
  }
  if (answer.isSlow) {
    return `stats__result--slow`;
  } else {
    return null;
  }
};

const flowStatsTemplate = (gameStatus) =>
  `
    <div class="stats">
      <ul class="stats">
      ${new Array(NUMBER_OF_GAMES).fill().map((it, i) =>`
      <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[i])}"></li>
      `).join(``)}
      </ul>
    </div>
  `;

export default flowStatsTemplate;

