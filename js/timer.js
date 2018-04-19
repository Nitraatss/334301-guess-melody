const MINIMUM_TIME = 0;

let totalTime = 340;

const getTimerMinutes = (currentTime) => {
  let minutes = Math.floor(currentTime / 60);

  return minutes;
};

const getTimerSeconds = (currentTime) => {
  let seconds = currentTime - Math.floor(totalTime / 60) * 60;

  if (!seconds) {
    seconds = `00`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return seconds;
};

let timerMinutes = getTimerMinutes(totalTime);
let timerSeconds = getTimerSeconds(totalTime);

export const timerMarkup = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
  <circle
    cx="390" cy="390" r="370"
    class="timer-line"
    style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

  <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">${timerMinutes}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">${timerSeconds}</span>
  </div>
</svg>`;

export const createTimer = (timerLimit) => ({
  tick: () => {
    return --timerLimit > MINIMUM_TIME ? timerLimit : `Ваше время вышло`;
  }
});
