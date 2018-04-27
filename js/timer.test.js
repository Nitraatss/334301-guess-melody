import {assert} from 'chai';
import {createTestTimer} from '../js/timer.js';

describe(`Timer tick test`, () => {

  it(`Time left`, () => {
    assert.equal(createTestTimer(40), 39);
  });


  it(`Time out`, () => {
    assert.equal(createTestTimer(1), `Ваше время вышло`);
  });
});
