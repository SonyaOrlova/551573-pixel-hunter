import {renderScreen} from './util.js';
// блоки для создания текущего экрана
import RulesView from './view-rules.js';
import getGreetingScreen from './screen-greeting.js';
// следующий экран
import {getInintialGameParams, goGame} from './screen-game.js';

const getRulesScreen = () => {
  const rules = new RulesView();

  rules.onInputChange = (input, submitBtn) => {
    if (input.value !== ``) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  };

  rules.onFormSubmit = (form, submitBtn) => {
    getInintialGameParams(); // обнуляет параметры игры
    renderScreen(goGame()); // загружает игру
    form.reset();
    submitBtn.disabled = true;
  };

  rules.onLogoClick = () => renderScreen(getGreetingScreen());

  const rulesScreen = rules.element;
  return rulesScreen;
};

export default getRulesScreen;

