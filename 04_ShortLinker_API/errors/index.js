const CustomError = require('./customError');
const NotFoundError = require('./notFoundError');
const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
const UnsupportedMediaTypeError = require('./unsupportedMediaError');
const ForbiddenError = require('./forbiddenError');

module.exports = {
  CustomError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnsupportedMediaTypeError,
  ForbiddenError,
};
