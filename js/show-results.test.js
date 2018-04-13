import {assert} from 'chai';
import {creatOtherPlayersResults, creatCurrentPlayerResult, showResults} from '../js/show-results.js';

describe(`Show results test`, () => {
  let otherPlayersResults;
  let currentPlayerResults;

  beforeEach(() => {
    otherPlayersResults = [];
  });

  it(`Out of lives`, () => {
    currentPlayerResults = creatCurrentPlayerResult(9, 0, 0);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });

  it(`Out of time`, () => {
    currentPlayerResults = creatCurrentPlayerResult(9, 3, 0);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Время вышло! Вы не успели отгадать все мелодии`);
  });

  it(`Last place`, () => {
    otherPlayersResults = creatOtherPlayersResults(3, 25, 3, 10);
    currentPlayerResults = creatCurrentPlayerResult(10, 3, 2);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Вы заняли 4 место из 4 игроков. Это лучше, чем у 0% игроков`);
  });

  it(`You achieved some place`, () => {
    otherPlayersResults = creatOtherPlayersResults(5, 20, 3, 10);
    currentPlayerResults = creatCurrentPlayerResult(17, 3, 2);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Вы заняли 3 место из 6 игроков. Это лучше, чем у 50% игроков`);
  });

  it(`You are first player of the game`, () => {
    creatCurrentPlayerResult(29, 3, 2);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Вы заняли 1 место из 1 игроков. Это лучше, чем у 100% игроков`);
  });
});


