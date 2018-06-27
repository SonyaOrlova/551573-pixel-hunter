import Loader from './utils/data-loader';
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

export default class Application {
  static async load() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    try {
      this.gameData = await Loader.loadData();
      Application.showGreeting();
    } catch (error) {
      Application.showError(error);
    }
  }

  static start() {
    Application.load().catch(Application.showError);
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
    rules.showNextScreen = (playerName) => this.showGame(playerName);
    rules.init();
  }

  static showGame(playerName) {
    const model = new GameModel(this.gameData, playerName);
    const game = new GameScreen(model);
    showScreen(game.root);
    game.showNextScreen = () => this.showStats(model);
    game.showModal = () => this.showModalConfirm();
    game.startTimer();
  }

  static async showStats(model) {
    try {
      await Loader.saveResults(model.gameState, model.playerName);

      this.gameResults = await Loader.loadResults(model.playerName);

      const stats = new StatsScreen(this.gameResults);
      showScreen(stats.root);
      stats.showGreetScreen = () => this.showGreeting();
      stats.init();
    } catch (error) {
      Application.showError(error);
    }
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
