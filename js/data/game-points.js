const SCORING_RULES = {
  // *add.points per answer
  correctAnswer: 100,
  quickResponse: 50,
  slowResponse: -50,
  remainingLife: 50
};

const NUMBER_OF_QUESTIONS = 10;

const SLOW_RESPONSE_TIMELIMIT = 20; // *sec
const QUICK_RESPONSE_TIMELIMIT = 10; // *sec

export const getScore = (answers, lives) => {
  if (answers.length !== NUMBER_OF_QUESTIONS || lives === 0) {
    return -1;
  }

  let points = 0;

  answers.forEach((answer) => {
    if (answer.isCorrect) {
      points += SCORING_RULES.correctAnswer;
    }
    if (answer.time < QUICK_RESPONSE_TIMELIMIT) {
      points += SCORING_RULES.quickResponse;
    }
    if (answer.time > SLOW_RESPONSE_TIMELIMIT) {
      points += SCORING_RULES.slowResponse;
    }
  });

  points += lives * SCORING_RULES.remainingLife;

  return points;
};


