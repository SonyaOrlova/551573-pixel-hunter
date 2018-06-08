let screens;
export const initScreens = (importScreens) => {
  screens = importScreens;
};

export const createElementFromTemplate = (template) => {
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
  // if (!screens[screenName]) {
  //   throw new Error(`error`);
  // }
  mainPage.appendChild(screens[screenName]());
};

export const backToScreen = (currentScreen, screenBackToName) => {
  const backBtn = currentScreen.querySelector(`.back`);
  backBtn.addEventListener(`click`, () => renderScreen(screenBackToName));
};
