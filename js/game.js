// Экран с играми, блок #game

import {createDomElement, wrapHeaderBlocks, mergeScreenBlocks, renderScreen} from './util.js';
import {NUMBER_OF_GAMES, gameTypeData, getGameOrder} from './game-data.js';
// блоки для создания текущего экрана
import backHeader from './header-back.js';
import timerHeader from './header-timer.js';
import livesHeader from './header-lives.js';
import footer from './footer.js';
// следующий экран
import stats from './stats.js';

// ********* создает template игровых элементов *********

const getGameTemplate = (gameType) => {
  switch (gameType) {

    case gameTypeData.oneImage:
      return `
      <div class="game">
        <p class="game__task">${gameType.description}</p>
        <form class="game__content game__content--wide">
          ${[...gameType.params].map((param) => `
          <div class="game__option" data-type="${param.type}" data-number="${param.index}">
            <img src="${param.src}" alt="Option ${param.index}" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input name="question${param.index}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question${param.index}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
            `).join(``)}
        </form>
      </div>
      `;

    case gameTypeData.twoImages:
      return `
      <div class="game">
        <p class="game__task">${gameType.description}</p>
        <form class="game__content">
          ${[...gameType.params].map((param) => `
            <div class="game__option" data-type="${param.type}" data-number="${param.index}">
              <img src="${param.src}" alt="Option ${param.index}" width="468" height="458">
              <label class="game__answer  game__answer--photo">
                <input name="question${param.index}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--wide  game__answer--paint">
                <input name="question${param.index}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
            `).join(``)}
        </form>
      </div>
      `;

    case gameTypeData.threeImages:
      return `
      <div class="game">
        <p class="game__task">${gameType.description}</p>
        <form class="game__content game__content--triple">
        ${[...gameType.params].map((param) => `
        <div class="game__option" data-type="${param.type}">
          <img src="${param.src}" alt="Option 1" width="304" height="455">
        </div>`).join(``)}
        </form>
      </div>
    `;

    default:
      return null;
  }
};

// ********* исходные параметры старта игры *********

// данные по игре
const NUMBER_OF_LIVES = 3;

let gameState; // параметры уровня
let gameOrder; // рандомный порядок игр

export const startGame = () => {

  gameOrder = getGameOrder();

  gameState = {
    level: 0,
    time: 0,
    lives: NUMBER_OF_LIVES,
    points: 0,
    answers: [],
    isFail: false
  };
};

const getGameResult = () => {
  if (gameState.lives === 0) {
    gameState.isFail = true;
  }
};

export const finishGame = () => {
  return gameState;
};

// переключает экраны
const changeGameLevel = () => {
  getGameResult();

  if (gameState.isFail || (gameState.level === NUMBER_OF_GAMES)) {
    renderScreen(stats());
  } else {
    renderScreen(game(gameState));
  }
};

// константы правил игры
const SLOW_RESPONSE_TIMELIMIT = 20; // *sec
const QUICK_RESPONSE_TIMELIMIT = 10; // *sec

// фиксирование результатов ответа
const timeDefault = 15; // временное значение скорости ответа

const getAnswer = (result, time) => {
  let answer = {
    isCorrect: result,
    time,
    isFast: time < QUICK_RESPONSE_TIMELIMIT,
    isSlow: time > SLOW_RESPONSE_TIMELIMIT
  };

  if (!answer.isCorrect) {
    gameState.lives -= 1;
  } // корректируем жизни

  gameState.answers.push(answer); // отправляем данные по ответу
};

// ********* создает игровые блоки по типам *********

// ..... Игра 1 изображение ......

const oneImageGame = () => {
  // меняет индекс уровня игры на следующий
  gameState.level += 1;

  // создает dom элемент игры
  const oneImageGameElement = createDomElement(getGameTemplate(gameTypeData.oneImage));

  // фиксирует результат и переходит на следующий уровень
  const form = oneImageGameElement.querySelector(`.game__content`);
  const option1Value = oneImageGameElement.querySelector(`.game__option`).dataset.type;

  const onRadioChange = () => {
    if (form.question1.value) {
      getAnswer((option1Value === form.question1.value), timeDefault); // результат
      form.reset(); // сброс формы
      changeGameLevel(); // переход на следующий уровень
    }
  };
  form.addEventListener(`click`, onRadioChange);

  return oneImageGameElement;
};

// ..... Игра 2 изображения ......

const twoImagesGame = () => {
  // меняет индекс уровня игры на следующий
  gameState.level += 1;

  // создает dom элемент игры
  const twoImagesGameElement = createDomElement(getGameTemplate(gameTypeData.twoImages));

  // фиксирует результат и переходит на следующий уровень
  const form = twoImagesGameElement.querySelector(`.game__content`);
  const options = twoImagesGameElement.querySelectorAll(`.game__option`);
  let option1Value;
  let option2Value;

  options.forEach((option) => {
    if (option.dataset.number === `1`) {
      option1Value = option.dataset.type;
    }
    if (option.dataset.number === `2`) {
      option2Value = option.dataset.type;
    }
  });

  const onRadioChange = () => {
    if (form.question1.value && form.question2.value) {
      getAnswer(
          (option1Value === form.question1.value) && (option2Value === form.question2.value),
          timeDefault
      ); // результат
      form.reset(); // сброс формы
      changeGameLevel(); // переход на следующий уровень
    }
  };
  form.addEventListener(`click`, onRadioChange);

  return twoImagesGameElement;
};

// ..... Игра 3 изображения ......

const threeImagesGame = () => {
  // меняет индекс уровня игры на следующий
  gameState.level += 1;

  // создает dom элемент игры
  const threeImagesGameElement = createDomElement(getGameTemplate(gameTypeData.threeImages));

  // фиксирует результат и переходит на следующий уровень
  const options = threeImagesGameElement.querySelectorAll(`.game__option`);
  const onImageClick = (evt) => {
    options.forEach((option) => option.classList.remove(`game__option--selected`));

    if (!evt.target.classList.contains(`game__option--selected`)) {
      evt.target.classList.add(`game__option--selected`);
    }
    getAnswer(evt.target.dataset.type === `paint`, timeDefault); // результат
    changeGameLevel(); // переход на следующий уровень
  };

  options.forEach((option) => {
    option.querySelector(`img`).style.pointerEvents = `none`; // для firefox
    option.addEventListener(`click`, onImageClick);
  });

  return threeImagesGameElement;
};

// ********* текущая статистика игры *********

export const gameStats = () => {

  const gameStatsTemplate =
  `
    <div class="stats">
      <ul class="stats">
      </ul>
    </div>
  `;

  const gameStatsElement = createDomElement(gameStatsTemplate);
  const gameStatsWrapper = gameStatsElement.querySelector(`ul`);

  for (let i = 0; i < NUMBER_OF_GAMES; i++) {
    const gameIndicator = document.createElement(`li`);
    gameIndicator.className = `stats__result stats__result--unknown`;
    gameStatsWrapper.appendChild(gameIndicator);
  } // добавляет индикаторы в элемент

  const gameIndicators = gameStatsElement.querySelectorAll(`li`);

  if (gameState.answers.length > 0) {

    gameState.answers.forEach((answer, i) => {

      gameIndicators[i].classList.remove(`stats__result--unknown`);

      if (!answer.isCorrect) {
        gameIndicators[i].classList.add(`stats__result--wrong`);
      }
      if (answer.isCorrect) {
        gameIndicators[i].classList.add(`stats__result--correct`);
      }
      if (answer.isFast) {
        gameIndicators[i].classList.add(`stats__result--fast`);
      }
      if (answer.isSlow) {
        gameIndicators[i].classList.add(`stats__result--slow`);
      }
    }); // меняет класс у индикатора
  }

  return gameStatsElement;
};

// ********* собирает игровый экран *********

export const game = (gameStatus = gameState) => {
  const isGame = true;

  const gameTypeMap = {
    "oneImage": oneImageGame,
    "twoImages": twoImagesGame,
    "threeImages": threeImagesGame
  };

  let currentGame = gameTypeMap[gameOrder[gameStatus.level]];

  // console.log(gameOrder);
  // console.log(gameState);
  // console.log(gameState.lives);
  // console.log(gameState.answers);
  // console.log(gameStats())

  const gameScreen = mergeScreenBlocks(
      wrapHeaderBlocks(
          backHeader(isGame),
          timerHeader(gameStatus),
          livesHeader(gameStatus)
      ),
      currentGame(),
      gameStats(),
      footer()
  );

  return gameScreen;
};
