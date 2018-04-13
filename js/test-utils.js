export const creatTestAnswers = (setAnswerResults, answerResult, timeSpend, answersLength) => {
  let arrayOfTestAnswers = [];
  let i;

  for (i = 0; i < answersLength; i++) {
    arrayOfTestAnswers.push(setAnswerResults(answerResult, timeSpend));
  }

  return arrayOfTestAnswers;
};

