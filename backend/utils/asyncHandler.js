const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((e) => next(e));
};

export default asyncHandler;
