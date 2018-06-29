const mainPage = document.querySelector(`.central`);

export const showScreen = (element) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(element);
};

export const showModal = (element) => {
  document.body.appendChild(element);
  // mainPage.appendChild(element);
};

export const showScreenWithAnimation = (element) => {
  mainPage.firstChild.classList.add(`hide-animation`);
  element.classList.add(`show-animation`);
  mainPage.appendChild(element);
  setTimeout(() => mainPage.removeChild(mainPage.firstChild), 1000);
};
