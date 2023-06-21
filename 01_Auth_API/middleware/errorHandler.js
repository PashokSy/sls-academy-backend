const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500, // INTERNAL_SERVER_ERROR
    message: err.message || 'Something went wrong, please try again later',
  };

  return res
    .status(customError.statusCode)
    .json({ success: false, message: customError.message });
};

module.exports = errorHandlerMiddleware;
