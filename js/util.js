
// создает элемент на базе строки-шаблона
export const createElementFromTemplate = (template) => {
  // const elementFragment = document.createDocumentFragment();
  // elementFragment.insertAdjacentHTML(`beforeEnd`, template);
  // return elementFragment;

  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

// отрисовывает экран на странице
const mainPage = document.querySelector(`.central`);

export const renderScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

// проверяет выбор radio кнопки с указанием группыs
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

export const uncheckRadios = (allRadios) => {
  allRadios.forEach((radio) => {
    radio.checked = false;
  });
};

export const backToScreen = (currentScreen, screenBackTo) => {
  const backBtn = currentScreen.querySelector(`.back`);
  backBtn.addEventListener(`click`, () => {
    renderScreen(screenBackTo);
  });
};
