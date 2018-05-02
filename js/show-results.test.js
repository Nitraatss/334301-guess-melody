import {assert} from 'chai';
import {creatCurrentPlayerResult, showResults} from '../js/show-results.js';

describe(`Show results test`, () => {
  let otherPlayersResults;
  let currentPlayerResults;

  beforeEach(() => {
    otherPlayersResults = [];
  });

  it(`Out of lives`, () => {
    currentPlayerResults = creatCurrentPlayerResult(9, 3, 0);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });

  it(`Out of time`, () => {
    currentPlayerResults = creatCurrentPlayerResult(9, 2, 0);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Время вышло! Вы не успели отгадать все мелодии`);
  });
});


