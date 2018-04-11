const MINIMUM_TIME = 0;

export const createTimer = (timerLimit) => ({
  tick: () => {
    if (timerLimit - 1 <= MINIMUM_TIME) {
      timerLimit = timerLimit - 1;
      return `Ваше время вышло`;
    } else {
      timerLimit = timerLimit - 1;
      return timerLimit;
    }
  }
});
