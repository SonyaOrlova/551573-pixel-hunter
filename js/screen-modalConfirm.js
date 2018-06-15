import {renderScreen} from './util.js';
// блоки для создания текущего экрана
import ModalConfirmView from './view-modalConfirm.js';
// следующий экран
import getGreetingScreen from './screen-greeting.js';

const getModalConfirmScreen = () => {
  const modalConfirm = new ModalConfirmView();
  const modalConfirmScreen = modalConfirm.element;

  modalConfirm.onBtnOkClick = () => renderScreen(getGreetingScreen());

  return modalConfirmScreen;
};

export default getModalConfirmScreen;

