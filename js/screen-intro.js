import {renderScreen} from './util.js';
// блоки для создания текущего экрана
import IntroView from './view-intro.js';
// следующий экран
import getGreetingScreen from './screen-greeting.js';

const getIntroScreen = () => {
  const intro = new IntroView();

  intro.onStartButtonClick = () => renderScreen(getGreetingScreen());

  const introScreen = intro.element;
  return introScreen;
};

export default getIntroScreen;
