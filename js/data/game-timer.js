const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const setTimer = (time) => {

  if (!isNumeric(time)) {
    throw new Error(`can set only numbers`);
  }

  if (time < 0) {
    throw new Error(`cannot set negative value`);
  }

  const timer = {
    timeLeft: time,
    isFinished: () => timer.timeLeft === 0,
    tick: () => {
      if (timer.timeLeft > 0) {
        timer.timeLeft -= 1; // *sec
      }
    }
  };

  return timer;
};
