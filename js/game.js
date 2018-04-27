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

const checkLoad = (response) => {
  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    return [];
  }
  throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
};

const showError = (error) => {
  throw new Error(`Ошибка ${error}`);
};

const seperateArtistQuestions = (questions) => {
  questions.forEach((element) => {
    if (element.type === QuestionType.ARTIST) {
      allQuestions.artist.push(element);
    }
  });
};

const seperateGenreQuestions = (questions) => {
  questions.forEach((element) => {
    if (element.type === `genre`) {
      allQuestions.genre.push(element);
    }
  });
};

const seperateQuestions = (questions) => {
  seperateArtistQuestions(questions);
  seperateGenreQuestions(questions);
};

export const loadQuestions = () => {
  return fetch(DATA_SERVER).then(checkLoad).then(seperateQuestions).catch(showError);
};

export const questions = {
  artist: [],
  genre: []
};

export const gameData = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];
