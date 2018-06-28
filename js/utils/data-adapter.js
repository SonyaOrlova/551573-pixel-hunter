export default (data) => {
  const adapted = [];

  const dataMapper = {
    category: {
      'tinder-like': `classify`,
      'two-of-two': `classify`,
      'one-of-three': `choose`
    },
    inner: {
      'tinder-like': `game__content  game__content--wide`,
      'two-of-two': `game__content`,
      'one-of-three': `game__content game__content--triple`
    }
  };

  data.forEach((it) => {
    let question = {

      type: it.type,

      description: it.question,

      category: dataMapper.category[it.type],

      inner: dataMapper.inner[it.type],

      get answers() {
        return [...it.answers].map((answer) => {
          return {
            get class() {
              return answer.type === `painting` ? `paint` : answer.type;
            },
            src: answer.image.url
          };
        });
      }
    };

    adapted.push(question);
  });

  return adapted;
};
