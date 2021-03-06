import {GameConcept} from '../utils/constants';

export default (answers) =>
  `
    <div class="stats">
      <ul class="stats">
      ${new Array(GameConcept.NUMBER_OF_GAMES).fill().map((answer, index) =>`
      <li class="stats__result stats__result--${answers[index] === undefined ? `unknown` : answers[index]}"></li>
      `).join(``)}
      </ul>
    </div>
  `;

