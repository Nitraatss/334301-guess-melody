import {getRandomInt} from '../js/utils.js';
import {gameData} from '../js/game.js';

export const creatArtistQuestion = () => {
  let correctIndex = getRandomInt(0, gameData.length - 1);

  const artistQuestion = {
    correctAnswer: creatArtistAnswer(correctIndex, gameData),
    incorrectAnswers: creatIncorrectArtistAnswers(correctIndex, gameData)
  };

  return artistQuestion;
};

const creatArtistAnswer = (correctAnswerPos, dataBase) => {
  const answer = {
    artist: dataBase[correctAnswerPos].artist,
    image: dataBase[correctAnswerPos].image,
    src: dataBase[correctAnswerPos].src
  };

  return answer;
};

const creatIncorrectArtistAnswers = (correctAnswerPos, data) => {
  let incorrectAnswers = [];
  let position = correctAnswerPos;

  while (incorrectAnswers.length < 1) {
    if (position + 1 < data.length) {
      position = position + 1;
      incorrectAnswers.push(creatArtistAnswer(position, data));
    } else {
      position = position - 1;
      incorrectAnswers.push(creatArtistAnswer(position, data));
    }
  }

  while (incorrectAnswers.length < 2) {
    if (position + 1 < data.length && position + 1 !== correctAnswerPos) {
      position = position + 1;
      incorrectAnswers.push(creatArtistAnswer(position, data));
    } else if (position + 2 < data.length && position + 2 !== correctAnswerPos) {
      position = position + 2;
      incorrectAnswers.push(creatArtistAnswer(position, data));
    } else if (position - 1 !== correctAnswerPos && position - 1 > 0) {
      position = position - 1;
      incorrectAnswers.push(creatArtistAnswer(position, data));
    } else if (position - 2 !== correctAnswerPos && position - 2 > 0) {
      position = position - 2;
      incorrectAnswers.push(creatArtistAnswer(position, data));
    }
  }
  return incorrectAnswers;
};
