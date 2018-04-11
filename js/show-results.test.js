import {assert} from 'chai';
import {initiateOtherPlayersResults, creatOtherPlayerResult, creatCurrentPlayerResult, showResults} from '../js/show-results.js';

describe(`Show results test`, () => {
  let otherPlayersResults = initiateOtherPlayersResults();
  let currentPlayerResults;

  it(`Out of lives`, () => {
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 12, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 11, 3, 10);
    otherPlayersResults.sort();
    currentPlayerResults = creatCurrentPlayerResult(9, 0, 0);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);

    otherPlayersResults = initiateOtherPlayersResults();
  });

  it(`Out of time`, () => {
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 12, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 11, 3, 10);
    otherPlayersResults.sort();
    currentPlayerResults = creatCurrentPlayerResult(9, 3, 0);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Время вышло! Вы не успели отгадать все мелодии`);

    otherPlayersResults = initiateOtherPlayersResults();
  });

  it(`Last place`, () => {
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 12, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 11, 3, 10);
    otherPlayersResults.sort();
    currentPlayerResults = creatCurrentPlayerResult(10, 3, 2);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Вы заняли последнее место`);

    otherPlayersResults = initiateOtherPlayersResults();
  });

  it(`You achieved some place`, () => {
    creatOtherPlayerResult(otherPlayersResults, 30, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 25, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 20, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 10, 3, 10);
    otherPlayersResults.sort();
    currentPlayerResults = creatCurrentPlayerResult(29, 3, 2);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Вы заняли 2 место из 6 игроков. Это лучше, чем у 66% игроков`);

    otherPlayersResults = initiateOtherPlayersResults();
  });

  it(`You are first player of the game`, () => {
    creatCurrentPlayerResult(29, 3, 2);

    assert.equal(showResults(otherPlayersResults, currentPlayerResults), `Вы заняли 1 место из 1 игроков. Это лучше, чем у 100% игроков`);

    otherPlayersResults = initiateOtherPlayersResults();
  });
});


