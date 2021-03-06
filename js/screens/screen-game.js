import {TimeLimits} from '../utils/constants';

import HeaderView from '../views/view-header';
import QuestionViewClassify from '../views/view-question-classify';
import QuestionViewChoose from '../views/view-question-choose';
import FooterView from '../views/view-footer';

export default class GameScreen {
  constructor(model, debug = false) {
    this.model = model;
    this._interval = null;
    this._debug = debug;

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
    const questionType = question.category;

    const questionTypeMap = {
      'classify': QuestionViewClassify,
      'choose': QuestionViewChoose
    };

    const QuestionViewClass = questionTypeMap[questionType];
    const questionView = new QuestionViewClass(question, this.model.gamePreloadedImages, this.model.gameState);

    questionView.onAnswer = (result) => {
      this.onAnswer(result);
      this.changeGameLevel();
    };

    questionView.onDebug(this._debug);

    return questionView;
  }

  createHeaderView() {
    const headerView = new HeaderView(this.model.gameState);
    headerView.onLogoClick = this.showModal;
    return headerView;
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
    this.clearTimer();
    this.model.goToNextLevel();

    if (this.model.isDead() || this.model.isGameComplete()) {
      this.showNextScreen();
    } else {
      this.updateScreen();
    }
  }

  onAnswer(result) {
    let answer;
    const answerTime = TimeLimits.INITIAL_TIMER - this.model.gameState.time;
    const answerResult = result;

    if (answerResult) {
      if (answerTime < TimeLimits.QUICK_RESPONSE_TIMELIMIT) {
        answer = `fast`;
      } else if (answerTime > TimeLimits.SLOW_RESPONSE_TIMELIMIT) {
        answer = `slow`;
      } else {
        answer = `correct`;
      }
    } else {
      answer = `wrong`;
    }

    if (answer === `wrong`) {
      this.model.die();
    }

    this.model.gameState.answers.push(answer);
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
    this.model.renewTimer();

    this.updateHeader();
    this.updateQuestion();

    this.startTimer();
  }

  showNextScreen() { }
  showModal() { }
}
