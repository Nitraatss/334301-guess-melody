import {assert} from 'chai';
import {setAnswerResults, calculateScore} from '../js/calculate-score.js';
import {creatTestAnswers} from '../js/test-utils.js';

describe(`Score test`, () => {
  let playerAnswers;

  beforeEach(() => {
    playerAnswers = [];
  });

  it(`Less then 10 answers are correct`, () => {
    playerAnswers = creatTestAnswers(setAnswerResults, true, 30, 8);


    assert.equal(calculateScore(playerAnswers), 8);
  });

  it(`All answers correct and fast`, () => {
    playerAnswers = creatTestAnswers(setAnswerResults, true, 10, 10);

    assert.equal(calculateScore(playerAnswers), 20);
  });

  it(`All answers correct but not fast`, () => {

    playerAnswers = creatTestAnswers(setAnswerResults, true, 40, 10);


    assert.equal(calculateScore(playerAnswers), 10);
  });

  it(`Mixed answers: all correct but not all fast`, () => {
    playerAnswers = creatTestAnswers(setAnswerResults, true, 1, 5);
    playerAnswers = playerAnswers.concat(creatTestAnswers(setAnswerResults, true, 30, 2));

    assert.equal(calculateScore(playerAnswers), 12);
  });

  it(`Mixed answers: Win. Some correct, some incorrect`, () => {
    playerAnswers = creatTestAnswers(setAnswerResults, true, 40, 14);
    playerAnswers = playerAnswers.concat(creatTestAnswers(setAnswerResults, true, 5, 2));
    playerAnswers = playerAnswers.concat(creatTestAnswers(setAnswerResults, false, 40, 3));

    assert.equal(calculateScore(playerAnswers), 12);
  });
});
