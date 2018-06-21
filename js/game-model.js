import {gameConcept, timeLimits} from './constants';
import {questions} from './data/game-data';

export default class GameModel {
  constructor() {
    this.restartGame();
  }

  restartGame() {
    this._gameState = {
      level: 0,
      time: timeLimits.INITIAL_TIMER,
      lives: gameConcept.NUMBER_OF_LIVES,
      answers: []
    };

    this._gameOrder = this.createGameOrder();
  }

  createGameOrder() {
    const gameTypes = questions.map((it) => it.category);

    const gameOrder = [];
    for (let i = 0; i < gameConcept.NUMBER_OF_GAMES; i++) {
      gameOrder[i] = gameTypes[Math.floor(Math.random() * (gameTypes.length))];
    }
    return gameOrder;
  }

  renewQuestionType() {
    this._questionType = questions.find((question) =>
      question.category === this._gameOrder[this._gameState.level]);
    return this._questionType;
  }

  die() {
    this._gameState.lives--;
  }

  isDead() {
    return this._gameState.lives === 0;
  }

  nextLevel() {
    return this._gameState.level++;
  }

  gameComplete() {
    return this._gameState.level === gameConcept.NUMBER_OF_GAMES;
  }

  tick() {
    this._gameState.time--;
  }

  restartTimer() {
    this._gameState.time = timeLimits.INITIAL_TIMER;
  }

  get gameState() {
    return this._gameState;
  }

  get gameOrder() {
    return this._gameOrder;
  }
}

