module.exports = (fn) => {
  const newF = (req, res, next) => {
    // fn(req, res, next).catch(next);
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  return newF;
};
