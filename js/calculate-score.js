const QUICK_ANSWER_TIME_LIMIT = 30;
const FAST_ANSWER_SCORE = 2;
const RIGHT_ANSWER_SCORE = 1;
const INCORRECT_ANSWER_SCORE = -2;

export const setAnswerResults = (answerResult, timeSpend) => ({
  correct: answerResult,
  time: timeSpend,
});

const countAnswerScore = (playerAnswer) => {
  if (playerAnswer.correct && playerAnswer.time < QUICK_ANSWER_TIME_LIMIT) {
    return FAST_ANSWER_SCORE;
  } else if (playerAnswer.correct) {
    return RIGHT_ANSWER_SCORE;
  }

  return INCORRECT_ANSWER_SCORE;
};

export const calculateScore = (playerAnswers) => {
  let score = 0;

  score = playerAnswers.reduce((sum, current) => {
    return sum + countAnswerScore(current);
  }, 0);

  return score;
};

export const calculateTime = (playerAnswers) => {
  let calculatedTime = 0;

  calculatedTime = playerAnswers.reduce((sum, current) => {
    return sum + current.time;
  }, 0);

  return calculatedTime;
};

export const calculateFastAnswers = (playerAnswers) => {
  let fastAnswersCounter = 0;

  playerAnswers.forEach((item) => {
    if (item.time < 30) {
      fastAnswersCounter++;
    }
  });

  return fastAnswersCounter;
};
