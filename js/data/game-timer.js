export const setTimer = (time) => {
  if (time < 0) {
    throw new Error(`cannot set negotive value`);
  }

  const timer = {
    timeLeft: time,
    isFinished: () => timer.timeLeft > 0 ? false : true,
    tick: () => {
      if (timer.timeLeft > 0) {
        timer.timeLeft -= 1; // *sec
      }
    }
  };

  return timer;
};
