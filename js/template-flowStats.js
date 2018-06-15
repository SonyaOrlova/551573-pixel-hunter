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
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[0])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[1])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[2])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[3])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[4])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[5])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[6])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[7])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[8])}"></li>
        <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[9])}"></li>
      </ul>
    </div>
  `;

export default flowStatsTemplate;
