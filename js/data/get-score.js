import {scoringRules} from '../constants';

const getScore = (answers, lives) => {

  let gameResult = {
    correctAnswers: {
      count: answers.filter((answer) => answer.isCorrect === true).length,
      get points() {
        return this.count * scoringRules.CORRECT_ANSWER;
      }
    },
    fastResponse: {
      count: answers.filter((answer) => answer.isFast === true).length,
      get points() {
        return this.count * scoringRules.FAST_RESPONSE;
      }
    },
    slowResponse: {
      count: answers.filter((answer) => answer.isSlow === true).length,
      get points() {
        return this.count * scoringRules.SLOW_RESPONSE;
      }
    },
    lives: {
      count: lives,
      get points() {
        return this.count * scoringRules.REMAINING_LIFE;
      }
    },
    getTotalScore: () =>
      gameResult.correctAnswers.points +
      gameResult.fastResponse.points +
      gameResult.slowResponse.points +
      gameResult.lives.points
  };

  return gameResult;
};

export default getScore;

