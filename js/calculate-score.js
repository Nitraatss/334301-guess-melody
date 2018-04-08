export const creatTestAnswer = (playerAnswers, answerResult, timeSpend) => {
  playerAnswers.push(setAnswerResults(answerResult, timeSpend));
};

export const clearAnswers = () => {
  playerAnswers = [];
};

const setAnswerResults = (answerResult, timeSpend) => ({
  correct: answerResult,
  time: timeSpend,
  answerScore: countAnswerScore(answerResult, timeSpend)
});

const countAnswerScore = (correct, time) => {
  if (correct && time < 30) {
    return 2;
  } else if (correct) {
    return 1;
  } else {
    return -2;
  }
};

const checkAnswers = (playerAnswers) => {
  playerAnswers.forEach((item) => {
    /* totalTime = totalTime + answer.time;*/

    if (item.correct) {
      correctAnswersCounter++;
      answersPoints = answersPoints + item.answerScore;
    } else {
      allAnswersCorrect = false;
    }

    if (item.time >= 30) {
      allAnswersFast = false;
    }
  });
};

export const calculateScore = (playerAnswers, notes) => {
  checkAnswers(playerAnswers);

  if (correctAnswersCounter < 10 || notes <= 0) {
    userResult = -1;
  } else if (allAnswersCorrect && allAnswersFast) {
    userResult = 20;
  } else if (allAnswersCorrect && !allAnswersFast) {
    userResult = 10;
  } else {
    userResult = answersPoints;
  }

  return userResult;
};

export let playerAnswers = [];
export const notes = 3;

let userResult = 0;
let correctAnswersCounter = 0;
/* let totalTime = 0;*/
let answersPoints = 0;
let allAnswersCorrect = true;
let allAnswersFast = true;
