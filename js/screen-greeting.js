import {renderScreen} from './util.js';
// блоки для создания текущего экрана
import GreetingView from './view-greeting.js';
// следующий экран
import getRulesScreen from './screen-rules.js';

const getGreetingScreen = () => {
  const greeting = new GreetingView();

  greeting.onContinueBtnClick = () => renderScreen(getRulesScreen());

  const greetingScreen = greeting.element;
  return greetingScreen;
};

export default getGreetingScreen;
