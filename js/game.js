import {createDomElement, mergeScreenBlocks, renderScreen, wrapHeaderBlocks} from './util.js';
import {gameTypeData, initialGameState, getGameOrder} from './game-data.js';
// import {initialGameState, getGameOrder} from './game-data.js';
// блоки для создания текущего экрана
import backHeader from './header-back.js';
import timerHeader from './header-timer.js';
import livesHeader from './header-lives.js';
import footer from './footer.js';

// создает template игровых экранов
const getGameTemplate = (gameType) => {
  switch (gameType) {

    case gameTypeData.oneImage:
      return `
      <div class="game">
        <p class="game__task">${gameType.description}</p>
        <form class="game__content game__content--wide">
          <div class="game__option">
          ${[...gameType.params].map((param) => `
            <img src="${param.src}" alt="Option ${param.index}" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input name="question${param.index}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question${param.index}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>`).join(``)}
          </div>
        </form>
      </div>
      `;

    case gameTypeData.twoImages:
      return `
      <div class="game">
        <p class="game__task">${gameType.description}</p>
        <form class="game__content">
          ${[...gameType.params].map((param) => `
            <div class="game__option">
              <img src="${param.src}" alt="Option ${param.index}" width="468" height="458">
              <label class="game__answer  game__answer--photo">
                <input name="question${param.index}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer  game__answer--wide  game__answer--paint">
                <input name="question${param.index}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>`).join(``)}
        </form>
      </div>
      `;

    case gameTypeData.threeImages:
      return `
      <div class="game">
        <p class="game__task">${gameType.description}</p>
        <form class="game__content game__content--triple">
        ${[...gameType.params].map((param) => `
        <div class="game__option">
          <img src="${param.src}" alt="Option 1" width="304" height="455">
        </div>`).join(``)}
        </form>
      </div>
      `;
  }
};

// исходные параметры старта игры (первый экран из 10, создание порядка игры)
let currentGameIndex = 0;

const gameOrder = getGameOrder();

// создает игровые блоки по типам
const oneImageGame = () => {
  currentGameIndex += 1;
  const oneImageGameElement = createDomElement(getGameTemplate(gameTypeData.oneImage));

  const form = oneImageGameElement.querySelector(`.game__content`);
  const onRadioChange = () => {
    if (form.question1.value) {
      renderScreen(game(initialGameState));
      form.reset();
    }
  };

  form.addEventListener(`click`, onRadioChange);

  return oneImageGameElement;
};

const twoImagesGame = () => {
  currentGameIndex += 1;
  const twoImagesGameElement = createDomElement(getGameTemplate(gameTypeData.twoImages));

  const form = twoImagesGameElement.querySelector(`.game__content`);
  const onRadioChange = () => {
    if (form.question1.value && form.question2.value) {
      renderScreen(game(initialGameState));
      form.reset();
    }
  };

  form.addEventListener(`click`, onRadioChange);

  return twoImagesGameElement;
};

const threeImagesGame = () => {
  currentGameIndex += 1;
  const threeImagesGameElement = createDomElement(getGameTemplate(gameTypeData.threeImages));

  const gameImages = threeImagesGameElement.querySelectorAll(`.game__option`);
  const onImageClick = (evt) => {
    gameImages.forEach((image) => image.classList.remove(`game__option--selected`));

    if (!evt.target.classList.contains(`game__option--selected`)) {
      evt.target.classList.add(`game__option--selected`);
    }
    renderScreen(game(initialGameState));
  };

  gameImages.forEach((image) => {
    image.querySelector(`img`).style.pointerEvents = `none`; // для firefox
    image.addEventListener(`click`, onImageClick);
  });

  return threeImagesGameElement;
};

export const game = (gameState) => {
  // const gameMap = ["threeImages", "twoImages", "oneImage", "threeImages", "threeImages", "oneImage", "twoImages", "threeImages", "twoImages", "threeImages"]
  const gameTypeMap = {
    "oneImageGame": oneImageGame,
    "twoImagesGame": twoImagesGame,
    "threeImagesGame": threeImagesGame
  };

  let currentGame = gameTypeMap[gameOrder[currentGameIndex]];

  const gameScreen = mergeScreenBlocks(
      wrapHeaderBlocks(
          backHeader(),
          timerHeader(gameState),
          livesHeader(gameState)),
      currentGame(),
      footer()
  );

  return gameScreen;
};
