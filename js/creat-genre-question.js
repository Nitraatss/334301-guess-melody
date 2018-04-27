import {getRandomInt} from '../js/utils.js';

export const creatGenreQuestion = (genreQuestions) => {
  const questionIndex = getRandomInt(0, genreQuestions.length - 1);
  const currentQuestionData = genreQuestions[questionIndex];
  genreQuestions.splice(questionIndex, 1);
  const correctGenre = currentQuestionData.genre;

  const genreQuestion = {
    correctAnswers: creatCorrectGenreAnswers(currentQuestionData, correctGenre),
    incorrectAnswers: creatIncorrectGenreAnswers(currentQuestionData, correctGenre),
    genre: correctGenre
  };

  return genreQuestion;
};

const genreAnswer = (answers, answerData) => {
  const answer = {
    genre: answerData.genre,
    src: answerData.src
  };

  answers.push(answer);
};

const creatCorrectGenreAnswers = (currentQuestionData, correctGenre) => {
  const correctAnswers = [];

  currentQuestionData.answers.forEach((element) => {
    if (element.genre === correctGenre) {
      genreAnswer(correctAnswers, element);
    }
  });

  return correctAnswers;
};


const creatIncorrectGenreAnswers = (currentQuestionData, correctGenre) => {
  const incorrectAnswers = [];

  currentQuestionData.answers.forEach((element) => {
    if (element.genre !== correctGenre) {
      genreAnswer(incorrectAnswers, element);
    }
  });

  return incorrectAnswers;
};

