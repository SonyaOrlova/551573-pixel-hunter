import {renderScreen} from './util.js';
import {NUMBER_OF_GAMES, getGameOrder} from './game-data.js';
// блоки для создания текущего экрана
import Question1View from './view-question-1.js';
import Question2View from './view-question-2.js';
import Question3View from './view-question-3.js';
import getModalConfirmScreen from './screen-modalConfirm.js';
// следующий экран
import getFinalStatsScreen from './screen-finalStats.js';

// ********* исходные параметры старта игры *********

// данные по игре

const NUMBER_OF_LIVES = 3;

let gameState; // параметры уровня
let gameOrder; // рандомный порядок игр

export const getInintialGameParams = () => {

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

const isGameOver = () => {
  if (gameState.lives === 0) {
    gameState.isFail = true;
  }
};

export const fixGameState = () => {
  return gameState;
}; // для отрисовки экрана итоговой статистики

// переключает экраны
const changeGameLevel = () => {
  isGameOver();

  gameState.level += 1;

  if (gameState.isFail || (gameState.level >= NUMBER_OF_GAMES)) {
    renderScreen(getFinalStatsScreen());
  } else {
    renderScreen(goGame(gameState));
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

// ********* создает игровые экраны по типам игр *********

// ..... Игра 1 изображение ......

const getOneImageQuestionScreen = () => {
  const oneImageQuestion = new Question1View(gameState);
  const oneImageQuestionScreen = oneImageQuestion.element;

  oneImageQuestion.onRadioChange = (form, option) => {
    const option1Value = option.dataset.type;
    const answer1Value = form.question1.value;

    if (answer1Value) {
      getAnswer((option1Value === answer1Value), timeDefault); // результат
      form.reset(); // сброс формы
      changeGameLevel(oneImageQuestionScreen); // переход на следующий уровень
    }
  };
  oneImageQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return oneImageQuestionScreen;
};

// ..... Игра 2 изображения ......

const getTwoImagesQuestionScreen = () => {
  const twoImagesQuestion = new Question2View(gameState);
  const twoImagesQuestionScreen = twoImagesQuestion.element;

  twoImagesQuestion.onRadioChange = (form, ...options) => {
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

    const answer1Value = form.question1.value;
    const answer2Value = form.question2.value;

    if (answer1Value && answer2Value) {
      getAnswer(
          (option1Value === answer1Value) && (option2Value === answer2Value),
          timeDefault
      ); // результат
      form.reset(); // сброс формы
      changeGameLevel(twoImagesQuestionScreen); // переход на следующий уровень
    }
  };

  twoImagesQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return twoImagesQuestionScreen;
};

// ..... Игра 3 изображения ......

const getThreeImagesQuestionScreen = () => {
  const threeImagesQuestion = new Question3View(gameState);
  const threeImagesQuestionScreen = threeImagesQuestion.element;

  threeImagesQuestion.onImageClick = (target) => {
    getAnswer(target.dataset.type === `paint`, timeDefault); // результат
    changeGameLevel(threeImagesQuestionScreen); // переход на следующий уровень
  };

  threeImagesQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return threeImagesQuestionScreen;
};

// ********* запускает игру *********

export const goGame = (gameStatus = gameState) => {
  const gameTypeMap = {
    "oneImage": getOneImageQuestionScreen(),
    "twoImages": getTwoImagesQuestionScreen(),
    "threeImages": getThreeImagesQuestionScreen()
  };

  const currentGameScreen = gameTypeMap[gameOrder[gameStatus.level]];

  // console.log(gameOrder);
  // console.log(gameState);
  // console.log(currentGameScreen);

  return currentGameScreen;
};
