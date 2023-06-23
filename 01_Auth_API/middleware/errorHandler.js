const { CustomError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  let customError = {};
  if (err instanceof CustomError) {
    customError = {
      statusCode: err.statusCode,
      message: err.message,
    };
  } else {
    customError = {
      statusCode: 500, // INTERNAL_SERVER_ERROR
      message: 'Something went wrong, please try again later',
    };
  }

  return res
    .status(customError.statusCode)
    .json({ success: false, message: customError.message });
};

module.exports = errorHandlerMiddleware;
