import {assert} from 'chai';
import {calculateScore, creatTestAnswer, clearAnswers, playerAnswers, notes} from '../js/calculate-score.js';

describe(`Score test`, () => {
  let i;

  it(`Less then 10 answers are correct`, () => {
    for (i = 0; i < 8; i++) {
      creatTestAnswer(playerAnswers, true, 10);
    }

    assert.equal(calculateScore(playerAnswers, notes), -1);

    clearAnswers();
  });

  it(`All answers correct and fast`, () => {
    for (i = 0; i < 12; i++) {
      creatTestAnswer(playerAnswers, true, 20);
    }

    assert.equal(calculateScore(playerAnswers, notes), 20);

    clearAnswers();
  });

  it(`All answers correct but not fast`, () => {
    for (i = 0; i < 12; i++) {
      creatTestAnswer(playerAnswers, true, 40);
    }

    assert.equal(calculateScore(playerAnswers, notes), 10);

    clearAnswers();
  });
});
