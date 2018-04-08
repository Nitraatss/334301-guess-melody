export const creatNewTimer = (timeLimit) => {
  timer = setTimer(timeLimit);
};

const setTimer = (timeLimit) => ({
  time: timeLimit
});

export const tick = () => {
  if (timer.time) {
    timer.time = timer.time - 1;

    return timer.time;
  } else {
    return `Ваше время вышло`;
  }
};

let timer;
