import {getRandomInt} from '../js/utils.js';

export const pickRandomQuestion = (questions) => {
  const questionIndex = getRandomInt(0, questions.length - 1);
  const randomQuestion = questions[questionIndex];
  questions.splice(questionIndex, 1);

  return randomQuestion;
};
