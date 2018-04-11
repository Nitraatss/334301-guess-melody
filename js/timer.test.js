import {assert} from 'chai';
import {createTimer} from '../js/timer.js';

describe(`Timer tick test`, () => {

  it(`Time left`, () => {
    assert.equal(createTimer(40).tick(), 39);
  });


  it(`Time out`, () => {
    assert.equal(createTimer(1).tick(), `Ваше время вышло`);
  });
});
