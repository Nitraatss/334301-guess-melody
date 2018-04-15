export const actualPlayer = {
  answersResuls: [],
  totalScore: 0,
  lives: 3,
  totalTime: 0
};

export const setPlayerInitialState = (player) => {
  player.answersResuls = [];
  player.totalScore = 0;
  player.lives = 3;
  player.totalTime = 0;
};

export const allPlayers = [];
