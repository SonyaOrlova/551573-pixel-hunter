// Экран правил игры, блок #rules.

import {createDomElement, wrapHeaderBlocks, mergeScreenBlocks, renderScreen} from './util.js';
// блоки для создания текущего экрана
import backHeader from './header-back.js';
import footer from './footer.js';
// следующий экран
import {startGame, game} from './game.js';

const rulesTemplate = `
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
`;

const rules = () => {
  const rulesElement = createDomElement(rulesTemplate);

  const rulesScreen = mergeScreenBlocks(
      wrapHeaderBlocks(backHeader()),
      rulesElement,
      footer()
  );

  const form = rulesScreen.querySelector(`.rules__form`);
  const formInput = rulesScreen.querySelector(`.rules__input`);
  const formSubmitBtn = rulesScreen.querySelector(`.rules__button`);

  const onFormInputChange = () => {
    if (formInput.value !== ``) {
      formSubmitBtn.disabled = false;
    } else {
      formSubmitBtn.disabled = true;
    }
  };

  const onFormSubmit = () => {
    startGame(); // обнуляет параметры игры
    renderScreen(game()); // загружает игру
    form.reset();
    formSubmitBtn.disabled = true;
  };

  formInput.addEventListener(`keyup`, onFormInputChange);
  form.addEventListener(`submit`, onFormSubmit);

  return rulesScreen;
};

export default rules;
