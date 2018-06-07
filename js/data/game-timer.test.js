import {assert} from 'chai';
import {setTimer} from './game-timer.js';

describe(`Check timer`, () => {

  it(`throw error if timer < 0`, () => {
    assert.throws(() => setTimer(-1), /cannot set negotive value/);
  });

  it(`decrease timer on tick`, () => {
    let timer = setTimer(30);
    timer.tick();
    assert.equal(timer.timeLeft, 29);
    timer.tick();
    assert.equal(timer.timeLeft, 28);
  });

  it(`inform on timer finished`, () => {
    let timer = setTimer(2);
    timer.tick();
    assert.equal(timer.isFinished(), false);
    timer.tick();
    assert.equal(timer.isFinished(), true);
  });
});
