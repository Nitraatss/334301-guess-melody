const MINIMUM_TIME = 0;
const DEFAULT_LIMIT = 300;

class Timer {
  constructor() {
    this.time = DEFAULT_LIMIT;
    this.interval = 0;
  }

  getTimerMinutes() {
    let minutes = Math.floor(this.time / 60);

    return minutes;
  }

  getTimerSeconds() {
    let seconds = this.time - Math.floor(this.time / 60) * 60;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return seconds;
  }

  formMarkup() {
    let timerMinutes = this.getTimerMinutes();
    let timerSeconds = this.getTimerSeconds();

    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${timerMinutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${timerSeconds}</span>
        </div>
      </svg>
    `;
  }

  set timeLimit(time) {
    this.time = time;
  }

  startTicking() {
    const timer = document.querySelector(`.timer-value`);
    const timerValueMins = timer.querySelector(`.timer-value-mins`);
    const timerValueSecs = timer.querySelector(`.timer-value-secs`);

    this.interval = setInterval(
        () => {
          if (this.time) {
            this.time--;
            timerValueMins.textContent = `${this.getTimerMinutes()}`;
            timerValueSecs.textContent = `${this.getTimerSeconds()}`;
          } else {
            timerValueMins.textContent = `0`;
            timerValueSecs.textContent = `00`;
            clearInterval(this.interval);
          }
        }, 1000
    );
  }

  stopTicking() {
    clearInterval(this.interval);
  }
}

export const timer = new Timer();

export const createTimer = (timerLimit) => ({
  tick: () => {
    return --timerLimit > MINIMUM_TIME ? timerLimit : `Ваше время вышло`;
  }
});
