export const creatTestAnswer = (playerAnswers, setAnswerResults, answerResult, timeSpend) => {
  playerAnswers.push(setAnswerResults(answerResult, timeSpend));
};
