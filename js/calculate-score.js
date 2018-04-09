const QUICK_ANSWER_TIME_LIMIT = 30;
const FAST_ANSWER_SCORE = 2;
const RIGHT_ANSWER_SCORE = 1;
const INCORRECT_ANSWER_SCORE = -2;
const MINIMUM_CORRECT_ANSWERS = 10;
const MINIMUM_LIVES = 0;
const LOOSER_SCORE = -1;
const FAST_WINNER_SCORE = 20;
const ALL_COORECT_WINNER_SCORE = 10;

export const clearAnswers = () => {
  playerAnswers = [];
  userResult = 0;
  correctAnswersCounter = 0;
  answersPoints = 0;
};

export const setAnswerResults = (answerResult, timeSpend) => ({
  correct: answerResult,
  time: timeSpend,
  answerScore: countAnswerScore(answerResult, timeSpend)
});

const countAnswerScore = (correct, time) => {
  if (correct && time < QUICK_ANSWER_TIME_LIMIT) {
    return FAST_ANSWER_SCORE;
  } else if (correct) {
    return RIGHT_ANSWER_SCORE;
  }

  return INCORRECT_ANSWER_SCORE;
};

const checkAnswers = () => {
  playerAnswers.forEach((item) => {
    if (item.correct) {
      correctAnswersCounter++;
      answersPoints = answersPoints + item.answerScore;
    } else {
      allAnswersCorrect = false;
      answersPoints = answersPoints + item.answerScore;
    }

    if (item.time >= QUICK_ANSWER_TIME_LIMIT) {
      allAnswersFast = false;
    }
  });
};

export const calculateScore = (lives) => {
  checkAnswers(playerAnswers);

  if (correctAnswersCounter < MINIMUM_CORRECT_ANSWERS || lives <= MINIMUM_LIVES) {
    userResult = LOOSER_SCORE;
  } else if (allAnswersCorrect && allAnswersFast) {
    userResult = FAST_WINNER_SCORE;
  } else if (allAnswersCorrect && !allAnswersFast) {
    userResult = ALL_COORECT_WINNER_SCORE;
  } else {
    userResult = answersPoints;
  }

  return userResult;
};

export const initiatePlayerAnswerArray = () => {
  playerAnswers = [];
};

export let playerAnswers;

let userResult = 0;
let correctAnswersCounter = 0;
let answersPoints = 0;
let allAnswersCorrect = true;
let allAnswersFast = true;
