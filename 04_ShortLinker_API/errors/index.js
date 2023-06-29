const CustomError = require('./customError');
const NotFoundError = require('./notFoundError');
const BadRequestError = require('./badRequestError');
const ConflictError = require('./conflictError');
const UnsupportedMediaType = require('./unsupportedMediaError');
const ForbiddenError = require('./forbiddenError');

module.exports = {
  CustomError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnsupportedMediaType,
  ForbiddenError,
};
