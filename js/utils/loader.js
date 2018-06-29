import adaptServerData from './data-adapter';
import {checkStatus, getImages, loadImage} from './loader-utils';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;

const DEFAULT_NAME = `test`;
const APP_ID = 54198800;

export default class Loader {
  static async loadData() {
    const response = await fetch(`${SERVER_URL}/questions`);
    checkStatus(response);
    const data = await response.json();
    return adaptServerData(data);
  }

  static preloadImages(data) {
    const images = getImages(data);
    const promises = [...images].map((image) => loadImage(image));
    return Promise.all(promises);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`);
    checkStatus(response);
    return await response.json();
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
    return checkStatus(response);
  }
}
