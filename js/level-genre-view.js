import {AbstractView} from '../js/abstract-view.js';
import {creatDOMElement} from "../js/create-dom-element.js";
import {formHeaderMarkup} from '../js/form-header-markup.js';
import {shuffleArray} from '../js/utils.js';
import {timerMarkup} from '../js/timer.js';
import {mistakes} from '../js/mistakes.js';
import {currentGame} from '../js/game-store.js';
import {DEFAULT_PLAYER_TIME} from '../js/game.js';
import {showRandomPage} from '../js/show-random-page.js';
import {setAnswerResults} from '../js/calculate-score.js';

let className = `main main--level main--level-genre`;

export class LevelGenreView extends AbstractView {
  constructor(genreQuestion) {
    super();
    this.genreQuestion = genreQuestion;
  }

  get template() {
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
      ${formHeaderMarkup(timerMarkup, mistakes(currentGame.state.lives))}

      <div class="main-wrap">
        <h2 class="title">Выберите ${correctGenre} треки</h2>
        <form class="genre">
          ${answersMakup}

          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    `;
  }

  render() {
    this._element = creatDOMElement(this.template, className);
  }

  bind() {
    const genreAnswerSend = this._element.querySelector(`.genre-answer-send`);
    const genreInputs = this._element.querySelectorAll(`input`);
    const allAudioPlayers = this._element.querySelectorAll(`audio`);
    const audioPlayers = document.querySelectorAll(`.player`);

    audioPlayers.forEach((item) => {
      let singleAudioPlayer = item.querySelector(`audio`);
      let playButton = item.querySelector(`.player-control`);

      playButton.addEventListener(`click`, () => {
        this.onPlayButtonClick(singleAudioPlayer, allAudioPlayers);
      });
    });

    genreAnswerSend.disabled = true;

    genreAnswerSend.addEventListener(`click`, () => {
      this.onGenreAnswerSendClick(genreInputs, genreAnswerSend);
    });

    genreInputs.forEach((item) => {
      item.addEventListener(`change`, () => {
        this.onGenreInputsChange(genreInputs, genreAnswerSend);
      });
    });
  }

  checkAnswer(inputs, correctAnswer) {
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
  }

  onGenreInputsChange(genreInputs, genreAnswerSend) {
    let check = [...genreInputs].some((item) => item.checked === true);

    genreAnswerSend.disabled = !check;
  }

  onGenreAnswerSendClick(genreInputs, genreAnswerSend) {
    if (!this.checkAnswer(genreInputs, this.genreQuestion)) {
      currentGame.addAnswerResults(setAnswerResults(false, DEFAULT_PLAYER_TIME));
      currentGame.decreaseLives();
    } else {
      currentGame.addAnswerResults(setAnswerResults(true, DEFAULT_PLAYER_TIME));
    }

    this.removeEventListeners(genreAnswerSend, genreInputs);
    showRandomPage();
  }

  removeEventListeners(genreAnswerSend, genreInputs) {
    genreAnswerSend.removeEventListener(`click`, this.onGenreAnswerSendClick);

    genreInputs.forEach((item) => {
      item.removeEventListener(`change`, this.onGenreInputsChange);
    });
  }

  onPlayButtonClick(singleAudioPlayer, allAudioPlayers) {
    if (singleAudioPlayer.paused) {
      allAudioPlayers.forEach((element) => {
        element.pause();
      });

      singleAudioPlayer.play();
    } else {
      singleAudioPlayer.pause();
      singleAudioPlayer.currentTime = 0;
    }
  }
}
