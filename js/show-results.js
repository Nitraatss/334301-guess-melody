const MINIMUM_LIVES = 3;
const MINIMUM_TIME = 0;
const QUESTIONS_COUNT = 10;

export const creatOtherPlayersResults = (otherPlayersNumber, totalScore, leftLives, leftTime) => {
  let otherPlayersResults = [];
  let i;
  let scoreStep = 0;
  let somePlayer;

  if (otherPlayersNumber === 1) {
    somePlayer = creatPlayerResult(totalScore, leftLives, leftTime);
    otherPlayersResults.push(somePlayer);
  } else {
    for (i = 0; i < otherPlayersNumber; i++) {
      if (i) {
        scoreStep = scoreStep + 2;
      }

      somePlayer = creatPlayerResult(totalScore - scoreStep, leftLives, leftTime);
      otherPlayersResults.push(somePlayer);
    }
  }

  return otherPlayersResults;
};

export const creatCurrentPlayerResult = (totalScore, leftLives, leftTime) => {
  return creatPlayerResult(totalScore, leftLives, leftTime);
};

const creatPlayerResult = (totalScore, lives, totalTime) => ({
  totalScore,
  lives,
  totalTime
});

const calculatePlayerSuccess = (playerPlace, totalPlayers) => {
  return Math.floor(((totalPlayers - playerPlace) / totalPlayers) * 100);
};

const comparePlayersScore = (leftPlayer, rightPlayer) => {
  return leftPlayer.totalScore > rightPlayer.totalScore ? 1 : -1;
};

const showWinnerPlayerResult = (resultsArray, currentPlayerResults, positionInArray) => {
  let totalPlayers;
  let playerPlace;
  let playerSuccess;
  let playersResults = resultsArray.slice();

  playersResults.push(currentPlayerResults);
  playersResults.sort(comparePlayersScore);

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
  let index = -1;
  let playersResults = otherPlayersResults.slice();
  let playersNumber = playersResults.length;

  if (currentPlayerResults.lives === MINIMUM_LIVES) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (currentPlayerResults.totalTime <= MINIMUM_TIME) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (currentPlayerResults.totalScore >= QUESTIONS_COUNT) {
    index = playersResults.findIndex((otherPlayer) => {
      return otherPlayer.totalScore <= currentPlayerResults.totalScore;
    });
  }

  if (index > -1) {
    return showWinnerPlayerResult(playersResults, currentPlayerResults, index);
  } else {
    return showWinnerPlayerResult(playersResults, currentPlayerResults, playersNumber);
  }
};
