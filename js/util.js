export const createDomElement = (html) => {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
};

export const wrapHeaderBlocks = (...blocks) => {
  const wrapper = document.createElement(`header`);
  wrapper.classList.add(`header`);
  blocks.forEach((block) => {
    wrapper.appendChild(block);
  });
  return wrapper;
};

export const mergeScreenBlocks = (...blocks) => {
  const fragment = document.createDocumentFragment();
  blocks.forEach((block) => {
    fragment.appendChild(block);
  });
  return fragment;
};

const mainPage = document.querySelector(`.central`);
export const renderScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

// export const renderModalScreen = (screen) => {
//   mainPage.appendChild(screen);
//   // screen.classList.add(`modal-confirm__wrap--hidden`);
// };

