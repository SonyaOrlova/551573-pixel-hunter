import {assert} from 'chai';
import {setTimer} from './game-timer.js';

describe(`Check timer`, () => {

  it(`throw error if set not number`, () => {
    assert.throws(() => setTimer(`not number`), /can set only numbers/);
    assert.throws(() => setTimer(undefined), /can set only numbers/);
    assert.throws(() => setTimer(null), /can set only numbers/);
    assert.throws(() => setTimer(), /can set only numbers/);
    assert.throws(() => setTimer(``), /can set only numbers/);
    assert.throws(() => setTimer(` `), /can set only numbers/);
  });

  it(`throw error if timer < 0`, () => {
    assert.throws(() => setTimer(-1), /cannot set negative value/);
  });

  it(`return result`, () => {
    assert.notEqual(setTimer(1), undefined);
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
