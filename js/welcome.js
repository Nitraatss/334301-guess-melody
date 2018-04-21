import {WelcomeView} from '../js/welcome-view.js';
import {showRandomPage} from '../js/show-random-page.js';

export const welcome = () => {
  const welcomePage = new WelcomeView();

  welcomePage.onMainPlayClick = () => {
    showRandomPage();
  };

  return welcomePage;
};


