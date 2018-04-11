const MINIMUM_LIVES = 0;
const MINIMUM_TIME = 0;
const QUESTIONS_COUNT = 10;

export const creatOtherPlayerResult = (otherPlayersResults, totalScore, leftLives, leftTime) => {
  otherPlayersResults.push(creatPlayerResult(totalScore, leftLives, leftTime));
};

export const creatCurrentPlayerResult = (totalScore, leftLives, leftTime) => {
  return creatPlayerResult(totalScore, leftLives, leftTime);
};

const creatPlayerResult = (totalScore, leftLives, leftTime) => ({
  score: totalScore,
  lives: leftLives,
  time: leftTime
});

const calculatePlayerSuccess = (playerPlace, totalPlayers) => {
  return Math.floor(((totalPlayers - playerPlace) / totalPlayers) * 100);
};

export const showResults = (otherPlayersResults, currentPlayerResults) => {
  const showWinnerPlayerResult = (positionInArray) => {
    allPlayersResults.push(currentPlayerResults);
    allPlayersResults.sort();

    totalPlayers = allPlayersResults.length;
    playerPlace = positionInArray + 1;

    if (positionInArray === 0) {
      playerSuccess = 100;
    } else {
      playerSuccess = calculatePlayerSuccess(playerPlace, totalPlayers);
    }

    return `Вы заняли ${playerPlace} место из ${totalPlayers} игроков. Это лучше, чем у ${playerSuccess}% игроков`;
  };

  let totalPlayers;
  let playerPlace;
  let playerSuccess;
  let i = 0;
  let allPlayersResults = otherPlayersResults.slice();

  if (currentPlayerResults.lives <= MINIMUM_LIVES) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (currentPlayerResults.time <= MINIMUM_TIME) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (currentPlayerResults.score >= QUESTIONS_COUNT && allPlayersResults.length > 0) {
    /* игрок прошел планку в 10 вопросов */
    for (let otherPlayer of otherPlayersResults) {
      if (otherPlayer.score <= currentPlayerResults.score && i !== allPlayersResults.length - 1) {
        return showWinnerPlayerResult(i);
      }
      i++;
    }
  } else if (currentPlayerResults.score >= QUESTIONS_COUNT && allPlayersResults.length === 0) {
    return showWinnerPlayerResult(0);
  }

  otherPlayersResults.push(currentPlayerResults);
  return `Вы заняли последнее место`;
};

export const initiateOtherPlayersResults = () => {
  return [];
};
