const QUICK_ANSWER_TIME_LIMIT = 30;
const FAST_ANSWER_SCORE = 2;
const RIGHT_ANSWER_SCORE = 1;
const INCORRECT_ANSWER_SCORE = -2;
const MINIMUM_CORRECT_ANSWERS = 10;
const MINIMUM_LIVES = 0;
const LOOSER_SCORE = -1;
const FAST_WINNER_SCORE = 20;
const ALL_COORECT_WINNER_SCORE = 10;

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

export const calculateScore = (playerAnswers, lives) => {
  let score = 0;

  score = playerAnswers.reduce((sum, current) => {
    return sum + countAnswerScore(current);
  }, 0);

  if (score < MINIMUM_CORRECT_ANSWERS || lives <= MINIMUM_LIVES) {
    return LOOSER_SCORE;
  } else if (score === FAST_WINNER_SCORE) {
    return FAST_WINNER_SCORE;
  } else if (score === ALL_COORECT_WINNER_SCORE) {
    return ALL_COORECT_WINNER_SCORE;
  } else {
    return score;
  }
};
