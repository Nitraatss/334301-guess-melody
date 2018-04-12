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

const showWinnerPlayerResult = (resultsArray, currentPlayerResults, positionInArray) => {
  let totalPlayers;
  let playerPlace;
  let playerSuccess;
  let playersResults = resultsArray.slice();

  playersResults.push(currentPlayerResults);
  playersResults.sort();

  totalPlayers = playersResults.length;
  playerPlace = positionInArray + 1;

  if (totalPlayers === 1) {
    playerSuccess = 100;
  } else {
    playerSuccess = calculatePlayerSuccess(playerPlace, totalPlayers);
  }

  return `Вы заняли ${playerPlace} место из ${totalPlayers} игроков. Это лучше, чем у ${playerSuccess}% игроков`;
};

export const showResults = (otherPlayersResults, currentPlayerResults) => {
  let index = 0;
  let playersResults = otherPlayersResults.slice();
  let playersLength = playersResults.length;

  if (currentPlayerResults.lives <= MINIMUM_LIVES) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (currentPlayerResults.time <= MINIMUM_TIME) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (currentPlayerResults.score >= QUESTIONS_COUNT) {
    if (playersLength > 1) {
      index = playersResults.findIndex((otherPlayer) => {
        return otherPlayer.score <= currentPlayerResults.score;
      });

      if (index !== playersLength - 1) {
        return showWinnerPlayerResult(playersResults, currentPlayerResults, index);
      }
    } else if (playersLength === 1 && playersResults[0].score < currentPlayerResults.score) {
      return showWinnerPlayerResult(playersResults, currentPlayerResults, index);
    } else if (playersLength === 0) {
      return showWinnerPlayerResult(playersResults, currentPlayerResults, 0);
    }
  }

  playersResults.push(currentPlayerResults);
  return `Вы заняли последнее место`;
};

