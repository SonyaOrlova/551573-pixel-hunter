import App from '../application';

import {timeLimits} from '../constants';

import HeaderView from '../views/view-header';
import QuestionView from '../views/view-questions';
import FooterView from '../views/view-footer';

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this._interval = null;

    this.header = this.createHeaderView();
    this.content = this.createQuestionView();
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  createQuestionView() {
    const questionType = this.model.renewQuestionType();
    const questionView = new QuestionView(questionType, this.model._gameState);

    switch (questionType.answerType) {
      case `radio`:
        questionView.onAnswer = (answers) => {
          this.onAnswer(answers.indexOf(false) === -1);
          this.changeGameLevel();
        }; break;

      case `point`:
        questionView.onAnswer = (target) => {
          this.onAnswer(target.dataset.type === questionType.answerCorrect);
          this.changeGameLevel();
        }; break;
    }
    return questionView;
  }

  createHeaderView() {
    const headerView = new HeaderView(this.model._gameState);
    headerView.onLogoClick = () => App.showModalConfirm();
    return headerView;
  }

  updateQuestion() {
    const nextQuestionView = this.createQuestionView();
    this.root.replaceChild(nextQuestionView.element, this.content.element);
    this.content = nextQuestionView;
  }

  updateHeader() {
    const nextHeaderView = this.createHeaderView();
    this.root.replaceChild(nextHeaderView.element, this.header.element);
    this.header = nextHeaderView;
  }

  updateScreen() {
    this.updateHeader();
    this.updateQuestion();
    this.startTimer();
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model._gameState.time <= 0) {
        this.onAnswer(false);
        this.changeGameLevel();
      }
      this.updateHeader();
    }, 1000);
  }

  clearTimer() {
    clearInterval(this._interval);
  }

  changeGameLevel() {
    this.model.nextLevel();

    if (this.model.isDead() || this.model.gameComplete()) {
      App.showStats(this.model._gameState);
    } else {
      this.updateScreen();
      this.model.restartTimer();
    }
  }

  onAnswer(result) {
    this.clearTimer();

    const answer = {
      isCorrect: result,
      time: timeLimits.INITIAL_TIMER - this.model._gameState.time,
      get isFast() {
        if (this.isCorrect) {
          return this.time < timeLimits.QUICK_RESPONSE_TIMELIMIT;
        } else {
          return undefined;
        }
      },
      get isSlow() {
        if (this.isCorrect) {
          return this.time > timeLimits.SLOW_RESPONSE_TIMELIMIT;
        } else {
          return undefined;
        }
      }
    };

    if (!answer.isCorrect) {
      this.model.die();
    }

    this.model._gameState.answers.push(answer);
  }
}
