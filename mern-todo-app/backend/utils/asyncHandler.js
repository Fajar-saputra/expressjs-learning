const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // Lemparkan error ke next(err)
  };
};

module.exports = asyncHandler;