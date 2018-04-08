import {assert} from 'chai';
import {creatNewTimer, tick} from '../js/timer.js';

describe(`Timer tick test`, () => {

  it(`Time left`, () => {
    creatNewTimer(40);
    assert.equal(tick(), 39);
  });


  it(`Time out`, () => {
    creatNewTimer(1);
    assert.equal(tick(), 0);
  });
});
