// const pictures = {
//   paintings: [
//     `../img/egg_big.png`,
//     `../img/egg_big.png`,
//     `../img/egg_big.png`
//   ],
//   photos: [
//     `../img/egg_big.png`,
//     `../img/egg_big.png`,
//     `../img/egg_big.png`
//   ]
// };

const pictures = {
  paintings: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,

    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,

    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,

    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,

    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const questions = [
  {
    category: `oneImage`,
    description: `Угадай, фото или рисунок?`,
    images: 1,
    answerType: `radio`,
    params: [
      {
        index: 1,
        type: `paint`,
        src: pictures.paintings[0]
      }
    ]
  },

  {
    category: `twoImages`,
    description: `Угадайте для каждого изображения фото или рисунок?`,
    images: 2,
    answerType: `radio`,
    params: [
      {
        index: 1,
        type: `paint`,
        src: pictures.paintings[1]
      },

      {
        index: 2,
        type: `photo`,
        src: pictures.photos[0]
      }
    ]
  },

  {
    category: `threeImages`,
    description: `Найдите рисунок среди изображений`,
    images: 3,
    answerType: `point`,
    answerCorrect: `paint`,
    params: [
      {
        index: 1,
        type: `paint`,
        src: pictures.paintings[2]
      },

      {
        index: 2,
        type: `photo`,
        src: pictures.photos[1]
      },

      {
        index: 3,
        type: `photo`,
        src: pictures.photos[2]
      }
    ]
  }
];
