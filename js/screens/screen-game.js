import {TimeLimits} from '../constants';

import HeaderView from '../views/view-header';
import QuestionViewRadio from '../views/view-question-Radio.js';
import QuestionViewPoint from '../views/view-question-Point.js';
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
    const question = this.model.renewQuestionType();
    const questionType = question.type;

    const questionTypeMap = {
      'radio': new QuestionViewRadio(question, this.model.gameState),
      'point': new QuestionViewPoint(question, this.model.gameState)
    };

    const questionView = questionTypeMap[questionType];

    questionView.onAnswer = (result) => {
      this.onAnswer(result);
      this.changeGameLevel();
    };

    return questionView;
  }


  createHeaderView() {
    const headerView = new HeaderView(this.model.gameState);
    headerView.onLogoClick = this.showModal;
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
      if (this.model.gameState.time <= 0) {
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
      this.showNextScreen();
    } else {
      this.updateScreen();
      this.model.restartTimer();
    }
  }

  onAnswer(result) {
    this.clearTimer();

    const answer = {
      isCorrect: result,
      time: TimeLimits.INITIAL_TIMER - this.model.gameState.time,
      get isFast() {
        if (this.isCorrect) {
          return this.time < TimeLimits.QUICK_RESPONSE_TIMELIMIT;
        } else {
          return undefined;
        }
      },
      get isSlow() {
        if (this.isCorrect) {
          return this.time > TimeLimits.SLOW_RESPONSE_TIMELIMIT;
        } else {
          return undefined;
        }
      }
    };

    if (!answer.isCorrect) {
      this.model.die();
    }

    this.model.gameState.answers.push(answer);
  }

  showNextScreen() { }
  showModal() { }
}
