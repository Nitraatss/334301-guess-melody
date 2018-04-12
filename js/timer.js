const MINIMUM_TIME = 0;

export const createTimer = (timerLimit) => ({
  tick: () => {
    return --timerLimit > MINIMUM_TIME ? timerLimit : `Ваше время вышло`;
  }
});
