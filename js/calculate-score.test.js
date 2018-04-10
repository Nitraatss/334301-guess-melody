import {assert} from 'chai';
import {playerAnswers, initiatePlayerAnswerArray, setAnswerResults, calculateScore, clearAnswers} from '../js/calculate-score.js';
import {creatTestAnswer} from '../js/test-utils.js';

initiatePlayerAnswerArray();

describe(`Score test`, () => {
  let i;
  let lives;

  it(`Less then 10 answers are correct`, () => {
    for (i = 0; i < 8; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 10);
    }

    lives = 3;
    assert.equal(calculateScore(playerAnswers, lives), -1);

    clearAnswers();
  });

  it(`All answers correct and fast`, () => {
    for (i = 0; i < 12; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 20);
    }

    lives = 3;
    assert.equal(calculateScore(playerAnswers, lives), 20);

    clearAnswers();
  });

  it(`All answers correct but not fast`, () => {
    for (i = 0; i < 12; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 40);
    }

    lives = 3;
    assert.equal(calculateScore(playerAnswers, lives), 10);

    clearAnswers();
  });

  it(`Mixed answers: all correct but not all fast`, () => {
    for (i = 0; i < 8; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 1);
    }

    for (i = 0; i < 12; i++) {
      creatTestAnswer(playerAnswers, setAnswerResults, true, 40);
    }

    lives = 3;
    assert.equal(calculateScore(playerAnswers, lives), 10);

    clearAnswers();
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

    lives = 3;
    assert.equal(calculateScore(playerAnswers, lives), 14);

    clearAnswers();
  });
});
