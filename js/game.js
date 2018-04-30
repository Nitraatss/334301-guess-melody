export const MINIMUM_PLAYERS_LIVES = 3;
export const MINIMUM_PLAYER_TIME = 0;

const DATA_SERVER = `https://es.dump.academy/guess-melody/questions`;

export const allQuestions = {
  artist: [],
  genre: []
};

const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

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

  seperateArtistQuestions(questions) {
    questions.forEach((element) => {
      if (element.type === QuestionType.ARTIST) {
        this.allQuestions.artist.push(element);
      }
    });
  }

  seperateGenreQuestions(questions) {
    questions.forEach((element) => {
      if (element.type === `genre`) {
        this.allQuestions.genre.push(element);
      }
    });
  }

  seperateQuestions(questions) {
    questions.forEach((element) => {
      this.allQuestions.push(element);
    });
  }

  loadQuestions() {
    return fetch(DATA_SERVER).then(this.checkLoad).then(this.seperateQuestions.bind(this)).catch(this.showError);
  }

  get questions() {
    return this.allQuestions;
  }
}

export const loader = new LoadService();
