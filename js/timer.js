const MINIMUM_TIME = 0;

export const creatNewTimer = (timeLimit) => {
  timer = setTimer(timeLimit);
};

const setTimer = (timeLimit) => ({
  time: timeLimit
});

export const tick = () => {
  if (timer.time - 1 <= MINIMUM_TIME) {
    return `Ваше время вышло`;
  } else {
    timer.time = timer.time - 1;
    return timer.time;
  }
};

let timer;
