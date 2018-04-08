export const creatOtherPlayerResult = (totalScore, leftNotes, leftTime) => {
  otherPlayersResults.push(creatPlayerResult(totalScore, leftNotes, leftTime));
};


export const creatCurrentPlayerResult = (totalScore, leftNotes, leftTime) => {
  currentPlayerResults = creatPlayerResult(totalScore, leftNotes, leftTime);
};

export const clearAllResults = () => {
  otherPlayersResults = [];
  currentPlayerResults = 0;
};

const creatPlayerResult = (totalScore, leftNotes, leftTime) => ({
  score: totalScore,
  notes: leftNotes,
  time: leftTime
});

const calculatePlayerSuccess = (playerPlace, totalPlayers) => {
  return Math.floor(((totalPlayers - playerPlace) / totalPlayers) * 100);
};

export const showResults = () => {
  otherPlayersResults.sort();

  if (currentPlayerResults.notes <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else if (currentPlayerResults.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (currentPlayerResults.score >= 10) {
    /* игрок прошел планку в 10 вопросов */
    let totalPlayers;
    let playerPlace;
    let playerSuccess;
    let i;

    for (i = 0; i < otherPlayersResults.length; i++) {
      if (otherPlayersResults[i].score <= currentPlayerResults.score && i !== otherPlayersResults.length - 1) {
        otherPlayersResults.push(currentPlayerResults);
        otherPlayersResults.sort();

        totalPlayers = otherPlayersResults.length;
        playerPlace = i + 1;
        playerSuccess = calculatePlayerSuccess(playerPlace, totalPlayers);

        return `Вы заняли ${playerPlace} место из ${totalPlayers} игроков. Это лучше, чем у ${playerSuccess}% игроков`;
      }
    }

    otherPlayersResults.push(currentPlayerResults);
    return `Вы заняли последнее место`;
  } else {
    return `Вы не смогли набрать достаточно балов`;
  }
};

export let otherPlayersResults = [];
export let currentPlayerResults;
