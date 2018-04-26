const MINIMUM_TIME = 0;

class Timer {
  constructor() {
    this.interval = 0;
  }

  getTimerMinutes() {
    let minutes = Math.floor(this.time / 60);

    if (minutes > 0) {
      return `${minutes}`;
    } else {
      return `00`;
    }
  }

  getTimerSeconds() {
    let seconds = this.time - Math.floor(this.time / 60) * 60;

    if (seconds < 10) {
      return `0${seconds}`;
    } else {
      return `${seconds}`;
    }
  }

  updateTimerMinutes() {
    let timerValue = document.querySelector(`.timer-value`);
    let timerValueMins = timerValue.querySelector(`.timer-value-mins`);
    let upMinutes = Math.floor(this.time / 60);

    if (upMinutes > 0) {
      timerValueMins.textContent = `${upMinutes}`;
    } else {
      timerValueMins.textContent = `00`;
    }
  }

  updateTimerSeconds() {
    let timerValue = document.querySelector(`.timer-value`);
    let timerValueSecs = timerValue.querySelector(`.timer-value-secs`);
    let upSeconds = this.time - Math.floor(this.time / 60) * 60;

    if (upSeconds < 10) {
      timerValueSecs.textContent = `0${upSeconds}`;
    } else {
      timerValueSecs.textContent = `${upSeconds}`;
    }
  }


  formMarkup(time) {
    this.time = time;

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
}

export const timer = new Timer();

export const createTimer = (timerLimit) => ({
  tick: () => {
    return --timerLimit > MINIMUM_TIME ? timerLimit : `Ваше время вышло`;
  }
});
