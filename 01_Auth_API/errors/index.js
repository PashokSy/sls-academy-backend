const CustomError = require('./customError');
const NotFoundError = require('./notFoundError');
const ConflictError = require('./conflictError');
const BadRequestError = require('./badRequestError');
const ForbiddenError = require('./forbiddenError');
const UnauthorizedError = require('./unauthorizedError');

module.exports = {
  CustomError,
  NotFoundError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
};
