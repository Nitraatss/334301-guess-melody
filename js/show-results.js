const MINIMUM_LIVES = 0;
const MINIMUM_TIME = 0;
const MINIMUM_SCORE = 10;

export const creatOtherPlayerResult = (otherPlayersResults, totalScore, leftLives, leftTime) => {
  otherPlayersResults.push(creatPlayerResult(totalScore, leftLives, leftTime));
};

export const creatCurrentPlayerResult = (totalScore, leftLives, leftTime) => {
  currentPlayerResults = creatPlayerResult(totalScore, leftLives, leftTime);
};

export const clearAllResults = () => {
  otherPlayersResults = [];
  currentPlayerResults = 0;
};

const creatPlayerResult = (totalScore, leftLives, leftTime) => ({
  score: totalScore,
  lives: leftLives,
  time: leftTime
});

const calculatePlayerSuccess = (playerPlace, totalPlayers) => {
  return Math.floor(((totalPlayers - playerPlace) / totalPlayers) * 100);
};

export const showResults = (otherPlayersResults) => {
  let totalPlayers;
  let playerPlace;
  let playerSuccess;

  otherPlayersResults.sort();


  if (otherPlayersResults.length === 0) {
    otherPlayersResults.push(currentPlayerResults);
    playerPlace = 1;

    return `Поздравляем вы заняли ${playerPlace} место. Вы первый игрок, сыгравший в эту игру`;
  } else if (currentPlayerResults.lives <= MINIMUM_LIVES) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (currentPlayerResults.time <= MINIMUM_TIME) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (currentPlayerResults.score >= MINIMUM_SCORE) {
    /* игрок прошел планку в 10 вопросов */
    const showWinnerPlayerResult = (positionInArray) => {
      otherPlayersResults.push(currentPlayerResults);
      otherPlayersResults.sort();

      totalPlayers = otherPlayersResults.length;
      playerPlace = positionInArray + 1;
      playerSuccess = calculatePlayerSuccess(playerPlace, totalPlayers);

      return `Вы заняли ${playerPlace} место из ${totalPlayers} игроков. Это лучше, чем у ${playerSuccess}% игроков`;
    };

    for (let i = 0; i < otherPlayersResults.length; i++) {
      if (otherPlayersResults[i].score <= currentPlayerResults.score && i !== otherPlayersResults.length - 1) {
        return showWinnerPlayerResult(i);
      }
    }
  }

  otherPlayersResults.push(currentPlayerResults);
  return `Вы заняли последнее место`;
};

export const initiateOtherPlayersResults = () => {
  otherPlayersResults = [];
};

export let otherPlayersResults;
let currentPlayerResults;
