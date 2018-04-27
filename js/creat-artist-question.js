import {getRandomInt} from '../js/utils.js';

export const creatArtistQuestion = (artistQuestions) => {
  const questionIndex = getRandomInt(0, artistQuestions.length - 1);
  const currentQuestionData = artistQuestions[questionIndex];
  artistQuestions.splice(questionIndex, 1);

  const artistQuestion = {
    correctAnswer: creatCorrectArtistAnswer(currentQuestionData),
    incorrectAnswers: creatIncorrrectArtistAnswers(currentQuestionData),
    questionText: currentQuestionData.question
  };

  return artistQuestion;
};

const creatCorrectArtistAnswer = (currentQuestionData) => {
  const correctAnswer = {
    src: currentQuestionData.src
  };

  currentQuestionData.answers.forEach((element) => {
    if (element.isCorrect) {
      correctAnswer.artist = element.title;
      correctAnswer.image = element.image.url;
    }
  });

  return correctAnswer;
};

const creatIncorrrectArtistAnswers = (currentQuestionData) => {
  let incorrectAnswers = [];

  currentQuestionData.answers.forEach((element) => {
    if (!element.isCorrect) {
      const answer = {
        artist: element.title,
        image: element.image.url
      };

      incorrectAnswers.push(answer);
    }
  });

  return incorrectAnswers;
};
