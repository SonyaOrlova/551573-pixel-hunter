import {renderScreen} from './util.js';
// блоки для создания текущего экрана
import ModalConfirmView from './view-modalConfirm.js';
// следующий экран
import getGreetingScreen from './screen-greeting.js';

const getModalConfirmScreen = () => {
  const modalConfirm = new ModalConfirmView();
  const modalConfirmScreen = modalConfirm.element;

  modalConfirm.onConfirm = () => renderScreen(getGreetingScreen());

  modalConfirm.onCancel = (modalWrapper) => {
    modalWrapper.classList.add(`modal-confirm__wrap--hidden`);
  };

  return modalConfirmScreen;
};

export default getModalConfirmScreen;

