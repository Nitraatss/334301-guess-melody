const APP_ID = `22821421984`;
const RESULTS_SERVER = `https://es.dump.academy/guess-melody/stats/:${APP_ID}`;
const DATA_SERVER = `https://es.dump.academy/guess-melody/questions`;

class NetworkService {
  constructor() {
    this.allQuestions = [];
    this.allPlayers = [];
  }

  checkLoad(response) {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return [];
    }
    return this.showError(response.status);
  }


  showError(error) {
    const errorMesage = document.querySelector(`.error-message`);
    errorMesage.style = `display: block;`;

    errorMesage.textContent = `Ошибка: ${error}`;
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

export const network = new NetworkService();

