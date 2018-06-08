import {assert} from 'chai';
import {getScore} from './game-points.js';

describe(`Check game scoring`, () => {

  it(`return -1 if answered < 10 questions`, () => {
    const answers = [
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15}
    ];

    assert.equal(getScore(answers, 3), -1);
  });

  it(`return -1 if remaining lives === 0`, () => {
    const answers = [
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15}
    ];

    assert.equal(getScore(answers, 0), -1);
  });

  it(`return correct score`, () => {

    // *normal time per answer + different amount of remaining lives
    const answers = [
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15},
      {isCorrect: true, time: 15}
    ];

    assert.equal(getScore(answers, 3), 1150);
    assert.equal(getScore(answers, 2), 1100);
    assert.equal(getScore(answers, 1), 1050);

    // *different time per answer + max amount of remaining lives

    answers[0].time = 5;
    assert.equal(getScore(answers, 3), 1200);

    answers[0].time = 25;
    assert.equal(getScore(answers, 3), 1100);
  });
});
