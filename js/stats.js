// Экран с результатами, блок #stats.

import {createDomElement, wrapHeaderBlocks, mergeScreenBlocks} from './util.js';
// блоки для создания текущего экрана
import backHeader from './header-back.js';
import footer from './footer.js';

import {finishGame, gameStats} from './game.js';

// подсчет очков

const SCORING_RULES = {
  // *points per answer
  correctAnswer: 100,
  fastResponse: 50,
  slowResponse: -50,
  remainingLife: 50
};

const getScore = (answers, lives) => {
  let gameResult = {
    correctAnswers: {
      count: 0,
      points: 0
    },
    fastResponse: {
      count: 0,
      points: 0
    },
    slowResponse: {
      count: 0,
      points: 0
    },
    lives: {
      count: 0,
      points: 0
    },
    totalPonts: 0
  };

  answers.forEach((answer) => {

    if (answer.isCorrect) {
      gameResult.correctAnswers.count += 1;
      gameResult.correctAnswers.points += SCORING_RULES.correctAnswer;
    }
    if (answer.isFast) {
      gameResult.fastResponse.count += 1;
      gameResult.fastResponse.points += SCORING_RULES.fastResponse;
    }
    if (answer.isSlow) {
      gameResult.slowResponse.count += 1;
      gameResult.slowResponse.points += SCORING_RULES.slowResponse;
    }
  });

  gameResult.lives.count = lives;
  gameResult.lives.points = lives * SCORING_RULES.remainingLife;

  gameResult.totalPoints =
    gameResult.correctAnswers.points +
    gameResult.fastResponse.points +
    gameResult.slowResponse.count +
    gameResult.lives.points;

  return gameResult;
};

// экран статистики

const stats = () => {

  const statsTemplate = `
  <div class="result">
    <h1>${finishGame().isFail ? `Fail` : `Победа`}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2" class="result__indicators">
          ${gameStats().childNodes[1].outerHTML}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${getScore(finishGame().answers, finishGame().lives).correctAnswers.points}
        </td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${getScore(finishGame().answers, finishGame().lives).fastResponse.count}
        &nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${getScore(finishGame().answers, finishGame().lives).fastResponse.points}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${getScore(finishGame().answers, finishGame().lives).lives.count}
        &nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${getScore(finishGame().answers, finishGame().lives).lives.points}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${getScore(finishGame().answers, finishGame().lives).slowResponse.count}
        &nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${getScore(finishGame().answers, finishGame().lives).slowResponse.points}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${getScore(finishGame().answers, finishGame().lives).totalPoints}
        </td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </div>
`;

  const statsElement = createDomElement(statsTemplate);

  const statsScreen = mergeScreenBlocks(
      wrapHeaderBlocks(backHeader()),
      statsElement,
      footer()
  );

  return statsScreen;
};

export default stats;
