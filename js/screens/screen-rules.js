import App from '../application';

import HeaderView from '../views/view-header';
import RulesView from '../views/view-rules';
import FooterView from '../views/view-footer';

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView();
    this.content = new RulesView();
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  init() {
    this.header.onLogoClick = () => App.showGreeting();

    this.content.onInputChange = (input, submitBtn) => {
      if (input.value !== ``) {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    };

    this.content.onFormSubmit = () => App.showGame();
  }
}

