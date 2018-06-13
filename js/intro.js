// Главный экран, на основе блока #intro

import {createDomElement, mergeScreenBlocks, renderScreen} from './util.js';
// блок для создания текущего экрана
import footer from './footer.js';
// следующий экран
import greeting from './greeting.js';

const introTemplate = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
`;

const intro = () => {
  const introElement = createDomElement(introTemplate);
  const introScreen = mergeScreenBlocks(
      introElement,
      footer()
  );

  const startButton = introScreen.querySelector(`.intro__asterisk`);
  const onStartButtonClick = () =>
    renderScreen(greeting());

  startButton.addEventListener(`click`, onStartButtonClick);

  return introScreen;

};

export default intro;

