import {ResultView} from '../js/result-view.js';
import {calculateScore, calculateTime} from '../js/calculate-score.js';
import {showResults} from '../js/show-results.js';
import {MINIMUM_PLAYERS_LIVES, MINIMUM_PLAYER_TIME} from '../js/game.js';
import {ResultMarkup} from '../js/result-markup.js';
import {currentGame} from '../js/game-store.js';
import {welcome} from '../js/welcome.js';
import {showPage} from '../js/show-page.js';

const STARTING_INDEX = 1;

const formResultMarkup = () => {
  currentGame.setTotalScore(calculateScore(currentGame.state.answersResuls));
  currentGame.setTotalTime(calculateTime(currentGame.state.answersResuls));

  const currentPlayerResult = {
    answersResuls: currentGame.state.answersResuls,
    totalScore: currentGame.state.totalScore,
    lives: currentGame.state.lives,
    totalTime: currentGame.state.totalTime,
  };

  let result = showResults(currentGame.state.allPlayers, currentPlayerResult);

  if (currentPlayerResult.lives !== MINIMUM_PLAYERS_LIVES && currentPlayerResult.totalTime !== MINIMUM_PLAYER_TIME) {
    currentGame.addPlayerResult(currentPlayerResult);
  }

  const resultMarkupParts = new ResultMarkup(currentPlayerResult, result);

  return `
  ${resultMarkupParts.header}
  <h2 class="title">${resultMarkupParts.formTitleMarkup()}</h2>

  ${resultMarkupParts.formResultInfoMarkup()}

  <span role="button" tabindex="0" class="main-replay">${resultMarkupParts.formButtonMarkup()}</span>
  `;
};

const onMainReplayClickTry = () => {
  currentGame.state.round = STARTING_INDEX;
  currentGame.setInitialParams();
  return showPage(welcome);
};

export const finalResult = () => {
  return new ResultView(formResultMarkup(), onMainReplayClickTry);
};

