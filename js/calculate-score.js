const QUICK_ANSWER_TIME_LIMIT = 30;

const ANSWERS_SCORE = {
  FAST: 2,
  CORRECT: 1,
  INCORRECT: -2
};

export const setAnswerResults = (answerResult, timeSpend) => ({
  correct: answerResult,
  time: timeSpend,
});

const countAnswerScore = (playerAnswer) => {
  if (playerAnswer.correct && playerAnswer.time < QUICK_ANSWER_TIME_LIMIT) {
    return ANSWERS_SCORE.FAST;
  } else if (playerAnswer.correct) {
    return ANSWERS_SCORE.CORRECT;
  }

  return ANSWERS_SCORE.INCORRECT;
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
