import {assert} from 'chai';
import {creatOtherPlayerResult, creatCurrentPlayerResult, clearAllResults, showResults} from '../js/show-results.js';

describe(`Show results test`, () => {
  it(`Out of lives`, () => {
    creatOtherPlayerResult(15, 3, 10);
    creatOtherPlayerResult(12, 3, 8);
    creatOtherPlayerResult(11, 3, 10);
    creatCurrentPlayerResult(9, 0, 0);

    assert.equal(showResults(), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);

    clearAllResults();
  });

  it(`Out of time`, () => {
    creatOtherPlayerResult(15, 3, 10);
    creatOtherPlayerResult(12, 3, 8);
    creatOtherPlayerResult(11, 3, 10);
    creatCurrentPlayerResult(9, 3, 0);

    assert.equal(showResults(), `Время вышло! Вы не успели отгадать все мелодии`);

    clearAllResults();
  });

  it(`Last place`, () => {
    creatOtherPlayerResult(15, 3, 10);
    creatOtherPlayerResult(12, 3, 8);
    creatOtherPlayerResult(11, 3, 10);
    creatCurrentPlayerResult(10, 3, 2);

    assert.equal(showResults(), `Вы заняли последнее место`);

    clearAllResults();
  });

  it(`You achieved some place`, () => {
    creatOtherPlayerResult(30, 3, 10);
    creatOtherPlayerResult(25, 3, 10);
    creatOtherPlayerResult(20, 3, 10);
    creatOtherPlayerResult(15, 3, 8);
    creatOtherPlayerResult(10, 3, 10);
    creatCurrentPlayerResult(29, 3, 2);

    assert.equal(showResults(), `Вы заняли 2 место из 6 игроков. Это лучше, чем у 66% игроков`);

    clearAllResults();
  });

  it(`You are first player of the game`, () => {
    assert.equal(showResults(), `Поздравляем вы заняли 1 место. Вы первый игрок, сыгравший в эту игру`);

    clearAllResults();
  });
});


