const mainPage = document.querySelector(`.central`);

export const showScreen = (element) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(element);
};

export const showModal = (element) => {
  mainPage.appendChild(element);
};

export const showScreenWithAnimation = (element) => {
  mainPage.firstChild.classList.add(`hide-animation`);
  element.classList.add(`show-animation`);
  setTimeout(() => showScreen(element), 1000);
};