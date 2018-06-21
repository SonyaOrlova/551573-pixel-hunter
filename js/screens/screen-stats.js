import App from '../application';

import HeaderView from '../views/view-header';
import StatsView from '../views/view-stats';
import FooterView from '../views/view-footer';

export default class RulesScreen {
  constructor(gameState) {
    this.header = new HeaderView();
    this.content = new StatsView(gameState);
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  init() {
    this.header.onLogoClick = () => App.showGreeting();
  }
}
