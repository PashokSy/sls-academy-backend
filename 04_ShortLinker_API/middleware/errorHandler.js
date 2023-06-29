const { CustomError, BadRequestError, ForbiddenError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  let customError = {};

  if (err instanceof CustomError) {
    customError = {
      statusCode: err.statusCode,
      message: err.message,
    };
  } else if (err.statusCode === 400 && req.method === 'GET') {
    customError = new ForbiddenError('The request could not be satisfied');
  } else if (err.statusCode === 400) {
    customError = new BadRequestError('Invalid Data Provided');
  } else {
    customError = {
      statusCode: 500,
      message: 'Something went wrong, please try again later',
    };
  }

  return res
    .status(customError.statusCode)
    .json({ errorMessage: customError.message });
};

module.exports = errorHandlerMiddleware;
