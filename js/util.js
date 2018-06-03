
let screens;
export const initScreens = (importScreens) => {
  screens = importScreens;
};

export const createElementFromTemplate = (template) => {
  // const wrapper = document.createElement(`div`);
  // wrapper.innerHTML = template.trim();
  // return wrapper;

  // // вариант 1 - не работает с экрана game2
  // return document.createRange().createContextualFragment(template);

  const fragment = document.createDocumentFragment();
  const container = document.createElement(`div`);

  container.innerHTML = template.trim();

  while (container.childNodes.length > 0) {
    fragment.appendChild(container.childNodes[0]);
  }
  return fragment;
};

const mainPage = document.querySelector(`.central`);
export const renderScreen = (screenName) => {
  mainPage.innerHTML = ``;
  // if(!screens[screenName]){
  //   throw new Error(`error`);
  // }
  mainPage.appendChild(screens[screenName].cloneNode(true));
};

export const checkRadio = (currentScreen, radioGroupName) => {
  let isRadioChecked = false;
  const groupRadios = currentScreen.querySelectorAll(`input[name=${radioGroupName}]`);
  groupRadios.forEach((radio) => {
    if (radio.checked) {
      isRadioChecked = true;
    }
  });
  return isRadioChecked;
};

export const backToScreen = (currentScreen, screenBackToName) => {
  const backBtn = currentScreen.querySelector(`.back`);
  backBtn.addEventListener(`click`, () => renderScreen(screenBackToName));
};
