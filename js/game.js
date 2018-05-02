export const MINIMUM_PLAYERS_LIVES = 3;
export const MINIMUM_PLAYER_TIME = 0;
const APP_ID = `22821421984`;
const RESULTS_SERVER = `https://es.dump.academy/guess-melody/stats/:${APP_ID}`;
const DATA_SERVER = `https://es.dump.academy/guess-melody/questions`;

class LoadService {
  constructor() {
    this.allQuestions = [];
  }

  checkLoad(response) {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return [];
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
  }

  showError(error) {
    throw new Error(`Ошибка ${error}`);
  }

  formQuestions(questions) {
    this.allQuestions = questions;
  }

  loadQuestions() {
    return fetch(DATA_SERVER).then(this.checkLoad).then(this.formQuestions.bind(this)).catch(this.showError);
  }

  get questions() {
    return this.allQuestions;
  }
}

export const loader = new LoadService();

class SaveService {
  constructor() {
  }

  showError(error) {
    throw new Error(`Ошибка ${error}`);
  }

  saveResult(result) {
    fetch(`${RESULTS_SERVER}`, {
      method: `POST`,
      body: JSON.stringify({
        'lives': result.lives,
        'totalTime': result.totalTime,
        'totalScore': result.totalScore
      }),
      headers: {
        'Content-Type': `application/json`
      }
    }).
        catch(this.showError);
  }
}

export const saver = new SaveService();

class ResultsLoadService {
  constructor() {
    this.allPlayers = [];
  }

  checkLoad(response) {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return [];
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
  }

  showError(error) {
    throw new Error(`Ошибка ${error}`);
  }

  formResults(results) {
    this.allPlayers = results;
  }

  loadResults() {
    return fetch(RESULTS_SERVER).then(this.checkLoad).then(this.formResults.bind(this)).catch(this.showError);
  }

  get allResults() {
    return this.allPlayers;
  }
}

export const resultsLoader = new ResultsLoadService();
