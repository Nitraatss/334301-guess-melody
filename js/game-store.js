class GameStore {
  constructor() {
    this.state = {
      answersResuls: [],
      totalScore: 0,
      lives: 0,
      totalTime: 0,
      allPlayers: [],
      round: 1
    };
  }

  addAnswerResults(newAnswer) {
    this.state.answersResuls.push(newAnswer);
  }

  addPlayerResult(newPlayer) {
    this.allPlayers.push(newPlayer);
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
  }
}

export const currentGame = new GameStore();