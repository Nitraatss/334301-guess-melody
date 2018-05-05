const APP_ID = `22821421984`;
const RESULTS_SERVER = `https://es.dump.academy/guess-melody/stats/:${APP_ID}`;
const DATA_SERVER = `https://es.dump.academy/guess-melody/questions`;

class NetworkService {
  constructor() {
    this.allQuestions = [];
    this.allPlayers = [];
  }

  _checkLoad(response) {
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      return [];
    }
    return this.showError(response.status);
  }


  _showError(error) {
    const errorMesage = document.querySelector(`.error-message`);
    errorMesage.style = `display: block;`;

    errorMesage.textContent = `Ошибка: ${error}`;
  }

  _saveResult(result) {
    fetch(`${RESULTS_SERVER}`, {
      method: `POST`,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': `application/json`
      }
    }).
        catch(this.showError);
  }

  _formResults(results) {
    this.allPlayers = results;
  }

  loadResults() {
    return fetch(RESULTS_SERVER).then(this._checkLoad).then(this._formResults.bind(this)).catch(this._showError);
  }

  get allResults() {
    return this.allPlayers;
  }

  _formQuestions(questions) {
    this.allQuestions = questions;
  }

  loadQuestions() {
    return fetch(DATA_SERVER).then(this._checkLoad).then(this._formQuestions.bind(this)).catch(this._showError);
  }

  get questions() {
    return this.allQuestions;
  }
}

export const network = new NetworkService();

