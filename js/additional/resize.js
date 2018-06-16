const resize = (frame, given) => {

  const ratios = [frame.width / given.width, frame.height / given.height];
  const ratio = Math.min(ratios[0], ratios[1]);

  let optimized = {
    width: given.width * ratio,
    height: given.height * ratio
  };

  return optimized;
};

export default resize;
