export const creatTestAnswers = (setAnswerResults, answerResult, timeSpend, answersLength) => {
  let arrayOfTestAnswers = [];
  let i;

  for (i = 0; i < answersLength; i++) {
    arrayOfTestAnswers.push(setAnswerResults(answerResult, timeSpend));
  }

  return arrayOfTestAnswers;
};

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
