export const allPlayers = [];

class GameStore {
  constructor() {
    this.state = {
      answersResuls: [],
      totalScore: 0,
      lives: 4,
      totalTime: 0
    };
  }

  addAnswerResults(newAnswer) {
    this.state.answersResuls.push(newAnswer);
  }

  decreaseLives() {
    this.state.lives--;
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
    this.state.lives = 4;
    this.state.totalTime = 0;
  }
}

export const currentGame = new GameStore();
