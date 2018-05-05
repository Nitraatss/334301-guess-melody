export const MINIMUM_PLAYERS_LIVES = 3;
export const MINIMUM_PLAYER_TIME = 0;
const STARTING_INDEX = 1;
const TIME_LIMIT = 300;

class GameModel {
  constructor() {
    this.state = {
      answersResuls: [],
      totalScore: 0,
      lives: 0,
      totalTime: 0,
      round: STARTING_INDEX,
      timeLimit: TIME_LIMIT,
      questions: []
    };
  }

  setTimeLimit(newLimit) {
    this.timeLimit = newLimit;
  }

  addAnswerResults(newAnswer) {
    this.state.answersResuls.push(newAnswer);
  }

  addPlayerResult(newPlayer) {
    this.state.allPlayers.push(newPlayer);
  }

  decreaseLives() {
    this.state.lives++;
  }

  nextRound() {
    this.state.round++;
  }

  setTotalScore(calculatedScore) {
    this.state.totalScore = this.state.totalScore + calculatedScore;
  }

  setTotalTime(calculatedTime) {
    this.state.totalTime = this.state.totalTime + calculatedTime;
  }

  setInitialParams() {
    this.state.answersResuls = [];
    this.state.totalScore = 0;
    this.state.lives = 0;
    this.state.totalTime = 0;
    this.state.timeLimit = TIME_LIMIT;
    this.state.round = STARTING_INDEX;
  }
}

export const currentGame = new GameModel();
