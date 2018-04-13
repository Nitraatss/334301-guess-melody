import {assert} from 'chai';
import {setAnswerResults, calculateScore} from '../js/calculate-score.js';
import {creatTestAnswer} from '../js/test-utils.js';

describe(`Score test`, () => {
  let i;
  let playerAnswers;

  beforeEach(() => {
    playerAnswers = [];
  });

  it(`Less then 10 answers are correct`, () => {
    for (i = 0; i < 8; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 30);
    }

    assert.equal(calculateScore(playerAnswers), 8);
  });

  it(`All answers correct and fast`, () => {
    for (i = 0; i < 10; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 10);
    }

    assert.equal(calculateScore(playerAnswers), 20);
  });

  it(`All answers correct but not fast`, () => {
    for (i = 0; i < 10; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 40);
    }

    assert.equal(calculateScore(playerAnswers), 10);
  });

  it(`Mixed answers: all correct but not all fast`, () => {
    for (i = 0; i < 5; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 1);
    }

    for (i = 0; i < 5; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 40);
    }

    assert.equal(calculateScore(playerAnswers), 15);
  });

  it(`Mixed answers: Win. Some correct, some incorrect`, () => {
    for (i = 0; i < 14; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 40);
    }

    for (i = 0; i < 2; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 5);
    }

    for (i = 0; i < 2; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, false, 40);
    }

    assert.equal(calculateScore(playerAnswers), 14);
  });
});
