import adaptServerData from './data-adapter';
import {checkStatus, loadImage} from './loader-utils';

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
    const promises = [];

    data.forEach((question, qIndex) => {
      const answers = question.answers;

      answers.forEach((answer, aIndex) => {
        promises.push(loadImage(answer.image.url)
      // // при успешной загрузке:
      // .then((image) => {
      //   // ресайз изображения
      //   const imageFrameSize = {
      //     width: answer.image.width,
      //     height: answer.image.height
      //   };
      //   const imageNaturalSize = {
      //     width: image.naturalWidth,
      //     height: image.naturalHeight
      //   };

      //   const imageOptimizedSize = resizeImage(imageFrameSize, imageNaturalSize);

      //   image.width = imageOptimizedSize.width;
      //   image.height = imageOptimizedSize.height;

      //   // data-атрибут с порядковым номером вопроса и вариантом ответа
      //   image.dataset.question = qIndex;
      //   image.dataset.answer = aIndex;
      // })
      // .catch((error) => onError(error))
        );
      });
    });
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
