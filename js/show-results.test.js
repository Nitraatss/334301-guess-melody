import {assert} from 'chai';
import {otherPlayersResults, initiateOtherPlayersResults, creatOtherPlayerResult, creatCurrentPlayerResult, clearAllResults, showResults} from '../js/show-results.js';

initiateOtherPlayersResults();

describe(`Show results test`, () => {
  it(`Out of lives`, () => {
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 12, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 11, 3, 10);
    creatCurrentPlayerResult(9, 0, 0);

    assert.equal(showResults(otherPlayersResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);

    clearAllResults();
  });

  it(`Out of time`, () => {
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 12, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 11, 3, 10);
    creatCurrentPlayerResult(9, 3, 0);

    assert.equal(showResults(otherPlayersResults), `Время вышло! Вы не успели отгадать все мелодии`);

    clearAllResults();
  });

  it(`Last place`, () => {
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 12, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 11, 3, 10);
    creatCurrentPlayerResult(10, 3, 2);

    assert.equal(showResults(otherPlayersResults), `Вы заняли последнее место`);

    clearAllResults();
  });

  it(`You achieved some place`, () => {
    creatOtherPlayerResult(otherPlayersResults, 30, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 25, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 20, 3, 10);
    creatOtherPlayerResult(otherPlayersResults, 15, 3, 8);
    creatOtherPlayerResult(otherPlayersResults, 10, 3, 10);
    creatCurrentPlayerResult(29, 3, 2);

    assert.equal(showResults(otherPlayersResults), `Вы заняли 2 место из 6 игроков. Это лучше, чем у 66% игроков`);

    clearAllResults();
  });

  it(`You are first player of the game`, () => {
    assert.equal(showResults(otherPlayersResults), `Поздравляем вы заняли 1 место. Вы первый игрок, сыгравший в эту игру`);

    clearAllResults();
  });
});


