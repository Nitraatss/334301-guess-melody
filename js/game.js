export const MINIMUM_PLAYERS_LIVES = 3;
export const MINIMUM_PLAYER_TIME = 0;
const APP_ID = `22821421984`;
const RESULTS_SERVER = `https://es.dump.academy/guess-melody/stats/:${APP_ID}`;
const DATA_SERVER = `https://es.dump.academy/guess-melody/questions`;

class NetworkService {
  constructor() {
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
    const node = document.createElement(`canvas`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: darkred;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.width = 500;
    node.style.fontSize = `30px`;

    node.textContent = error;

    document.body.insertAdjacentElement(`afterbegin`, node);

    const ctx = node.getContext(`2d`);
    ctx.fillStyle = `white`;
    ctx.font = `16px Arial`;
    ctx.textBaseline = `hanging`;

    ctx.fillText(error, 40, 50);
  }
}

class LoadService extends NetworkService {
  constructor() {
    super();
    this.allQuestions = [];
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

class StatService extends NetworkService {
  constructor() {
    super();
    this.allPlayers = [];
  }

  saveResult(result) {
    fetch(`${RESULTS_SERVER}`, {
      method: `POST`,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': `application/json`
      }
    }).
        catch(this.showError);
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

export const stat = new StatService();
