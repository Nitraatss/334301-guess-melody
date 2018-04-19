import AbstractView from '../js/abstract-view.js';
import {currentGame} from '../js/game-store.js';
import {gameData, DEFAULT_PLAYER_TIME} from '../js/game.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {showRandomPage} from '../js/show-random-page.js';
import {shuffleArray} from '../js/utils.js';
import {setAnswerResults} from '../js/calculate-score.js';
import {creatGenreQuestion} from '../js/creat-genre-question';

export default class LevelGenreView extends AbstractView {
  constructor(className = `main main--level main--level-genre`) {
    super();
    this.className = className;
    this.genreQuestion = creatGenreQuestion(gameData);
  }

  get template() {
    const levelGenreMarkup = (time, mistake) => {
      let answerID = 0;

      let correctGenre = this.genreQuestion.genre;

      let {correctAnswer, incorrectAnswers} = this.genreQuestion;

      let answersMakup = shuffleArray(incorrectAnswers.concat(correctAnswer)).map((item) => {
        answerID++;
        return `
          <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${item.src}"></audio>
              <button class="player-control player-control--pause" type="button"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${item.genre}" id="a-${answerID}">
          <label class="genre-answer-check" for="a-${answerID}"></label>
        </div>
      `;
      }).join(` `);

      return `
        ${formHeaderMarkup(time, mistake)}

        <div class="main-wrap">
          <h2 class="title">Выберите ${correctGenre} треки</h2>
          <form class="genre">
            ${answersMakup}

            <button class="genre-answer-send" type="submit">Ответить</button>
          </form>
        </div>
      `;
    };

    return levelGenreMarkup(timerMarkup, mistakes(currentGame.state.lives));
  }

  bind() {
    const checkAnswer = (inputs, correctAnswer) => {
      let trueAnswers = [];
      trueAnswers.push(correctAnswer);
      let answerResult = false;
      let checkedInputsCounter = 0;

      inputs.forEach((item) => {
        if (item.checked) {
          checkedInputsCounter++;
        }
      });

      if (trueAnswers.length === checkedInputsCounter) {
        inputs.forEach((element) => {
          if (element.checked && trueAnswers.indexOf(element.value) > -1) {
            answerResult = true;
          }
        });
      }

      return answerResult;
    };

    const onGenreInputsChange = () => {
      check = [...genreInputs].some((item) => item.checked === true);

      genreAnswerSend.disabled = !check;
    };

    const onGenreAnswerSendClick = () => {
      if (!checkAnswer(genreInputs, this.genreQuestion)) {
        currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
        currentGame.decreaseLives();
      } else {
        currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
      }

      removeEventListeners();
      showRandomPage();
    };

    const removeEventListeners = () => {
      genreAnswerSend.removeEventListener(`click`, onGenreAnswerSendClick);

      genreInputs.forEach((item) => {
        item.removeEventListener(`change`, onGenreInputsChange);
      });
    };

    let check;

    const genreAnswerSend = this.app.querySelector(`.genre-answer-send`);
    const genreInputs = this.app.querySelectorAll(`input`);
    const allAudioPlayers = this.app.querySelectorAll(`audio`);
    const audioPlayers = document.querySelectorAll(`.player`);

    audioPlayers.forEach((item) => {
      const onPlayButton = () => {
        if (singleAudioPlayer.paused) {
          allAudioPlayers.forEach((element) => {
            element.pause();
          });

          singleAudioPlayer.play();
        } else {
          singleAudioPlayer.pause();
          singleAudioPlayer.currentTime = 0;
        }
      };

      let singleAudioPlayer = item.querySelector(`audio`);
      let playButton = item.querySelector(`.player-control`);

      playButton.addEventListener(`click`, onPlayButton);
    });

    genreAnswerSend.disabled = true;

    genreAnswerSend.addEventListener(`click`, onGenreAnswerSendClick);

    genreInputs.forEach((item) => {
      item.addEventListener(`change`, onGenreInputsChange);
    });
  }
}
