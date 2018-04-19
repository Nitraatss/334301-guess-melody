import {getRandomInt} from '../js/utils.js';

export const creatGenreQuestion = (data) => {
  let correctGenre = data[getRandomInt(0, data.length - 1)].genre;

  const genreQuestion = {
    correctAnswer: creatCorrectGenreAnswer(data, correctGenre),
    incorrectAnswers: creatIncorrectGenreAnswers(data, correctGenre),
    genre: correctGenre
  };

  return genreQuestion;
};

const creatGenreAnswer = (data, index) => ({
  genre: data[index].genre,
  src: data[index].src
});

const creatCorrectGenreAnswer = (data, genre) => {
  let index;

  index = data.findIndex((option) => {
    return option.genre === genre;
  });

  return creatGenreAnswer(data, index);
};

const creatIncorrectGenreAnswers = (data, genre) => {
  let incorrectAnswers = [];
  const incorrectAnswersNumber = 3;
  let index;

  while (incorrectAnswers.length < incorrectAnswersNumber) {
    index = getRandomInt(0, data.length - 1);

    if (!incorrectAnswers.length) {
      if (data[index].genre !== genre) {
        incorrectAnswers.push(creatGenreAnswer(data, index));
      }
    } else {
      if (data[index].genre !== genre) {
        let flag = true;

        for (let i = 0; i < incorrectAnswers.length; i++) {
          if (incorrectAnswers[i].artist === data[index].artist) {
            flag = false;
            break;
          }
        }

        if (flag) {
          incorrectAnswers.push(creatGenreAnswer(data, index));
        }
      }
    }
  }

  return incorrectAnswers;
};
