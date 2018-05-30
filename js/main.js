'use strict';

(function () {

  const RIGHT_ARROW_KEY = 39;
  const LEFT_ARROW_KEY = 37;

  const mainPage = document.querySelector(`.central`);
  const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

    // выбор экрана и его отрисовка

  const renderScreen = (screen) => {
    mainPage.innerHTML = ``;
    mainPage.appendChild(screen.cloneNode(true));
  };

  let currentScreen = 0;

  const selectScreen = (index) => {
    index = index < 0 ? screens.length - 1 : index;
    index = index >= screens.length ? 0 : index;
    currentScreen = index;

    renderScreen(screens[currentScreen]);
  };

  const selectNextScreen = () => {
    selectScreen(currentScreen + 1);
  };

  const selectPrevScreen = () => {
    selectScreen(currentScreen - 1);
  };

  // отрисовка стрелок
  const renderArrows = () => {
    const arrowsHTMLCode = `
    <div class="arrows__wrap">
    <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
    </style>
    <button class="arrows__btn arrows__btn--left"><-</button>
    <button class="arrows__btn arrows__btn--right">-></button>
    </div>
    `;

    document.body.insertAdjacentHTML(`beforeend`, arrowsHTMLCode);
  };

  // handler на нажатие клавиш
  const onArrowKeysPress = (evt) => {
    switch (evt.keyCode) {
      case RIGHT_ARROW_KEY:
      selectNextScreen();
      break;
      case LEFT_ARROW_KEY:
      selectPrevScreen();
      break;
    }
  };

  // handler на клик стрелок
  const onArrowBtnsClick = (evt) => {
    switch (true) {
      case evt.target.classList.contains(`arrows__btn--right`):
      selectNextScreen();
      break;
      case evt.target.classList.contains(`arrows__btn--left`):
      selectPrevScreen();
      break;
    }
  };

  // добавление обработчиков на стрелки и кнопки
  const addArrowsListeners = () => {
    const arrowBtns = document.querySelectorAll(`.arrows__btn`);
    arrowBtns.forEach((btn) => {
      btn.addEventListener(`click`, onArrowBtnsClick);
    });

    document.addEventListener(`keydown`, onArrowKeysPress);
  };

  // запуск игры по клику на звездочку
  const startButton = document.querySelector(`.intro__asterisk`);
  const onStartButtonClick = () => {
    selectScreen(currentScreen);
    renderArrows();
    addArrowsListeners();
  };

  // обработчик на запуск игры
  startButton.addEventListener(`click`, onStartButtonClick);
})();
