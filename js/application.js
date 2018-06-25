import DataLoader from './utils/data-loader';
import GameModel from './game-model';

import IntroScreen from './screens/screen-intro';
import GreetingScreen from './screens/screen-greeting';
import RulesScreen from './screens/screen-rules';
import GameScreen from './screens/screen-game';
import StatsScreen from './screens/screen-stats';
import ModalConfirmScreen from './screens/screen-modal-confirm';
import ErrorScreen from './screens/screen-error';

const mainPage = document.querySelector(`.central`);

const showScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

const coverScreen = (screen) => {
  mainPage.appendChild(screen);
};


let gameData;

export default class Application {
  static start() {
    DataLoader.loadData().
      then((data) => {
        gameData = data;
      }).
      then(Application.showGreeting()).
      catch(Application.showError);
  }

  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    this.start();
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    showScreen(greeting.root);
    greeting.showNextScreen = () => this.showRules();
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.root);
    rules.showGreetScreen = () => this.showGreeting();
    rules.showNextScreen = () => this.showGame();
    rules.init();
  }

  static showGame() {
    const model = new GameModel(gameData);
    const game = new GameScreen(model);
    showScreen(game.root);
    game.showNextScreen = () => this.showStats(model.gameState);
    game.showModal = () => this.showModalConfirm();
    game.startTimer();
  }

  static showStats(gameState) {
    const stats = new StatsScreen(gameState);
    showScreen(stats.root);
    stats.showGreetScreen = () => this.showGreeting();
    stats.init();
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmScreen();
    coverScreen(modalConfirm.root);
    modalConfirm.showGreetScreen = () => this.showGreeting();
    modalConfirm.init();
  }

  static showError() {
    const error = new ErrorScreen();
    showScreen(error.root);
  }
}
