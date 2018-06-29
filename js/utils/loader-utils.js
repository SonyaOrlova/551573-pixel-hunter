// import resizeImage from './resize-image';

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

export const getImages = (data) => {
  const answers = [...data].map((question) => question.answers);
  const images = [];
  answers.forEach((answer) => {
    answer.forEach((it) => images.push(it.image));
  });
  return images;
};

export const loadImage = (img) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить изображение: ${img.url}`);

    // ресайз
    // const imgFrameSize = {
    //   width: img.width,
    //   height: img.height
    // };
    // const imgNaturalSize = {
    //   width: img.naturalWidth,
    //   height: img.naturalHeight
    // };

    // const imageOptimizedSize = resizeImage(imgFrameSize, imgNaturalSize);

    // итоговые параметры изображения
    // image.width = imageOptimizedSize.width;
    // image.height = imageOptimizedSize.height;
    image.src = img.url;
  })
};

