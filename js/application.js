import IntroScreen from './screens/screen-intro';
import GreetingScreen from './screens/screen-greeting';
import RulesScreen from './screens/screen-rules';
import GameScreen from './screens/screen-game';
import ModalConfirmScreen from './screens/screen-modalConfirm';
import StatsScreen from './screens/screen-stats';

import GameModel from './game-model';

const mainPage = document.querySelector(`.central`);

const showScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

const coverScreen = (screen) => {
  mainPage.appendChild(screen);
};

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    intro.init();
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    showScreen(greeting.root);
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.root);
    rules.init();
  }

  static showStats(gameState) {
    const stats = new StatsScreen(gameState);
    showScreen(stats.root);
    stats.init();
  }

  static showGame() {
    const game = new GameScreen(new GameModel());
    showScreen(game.root);
    game.startTimer();
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmScreen();
    coverScreen(modalConfirm.root);
    modalConfirm.init();
  }
}
