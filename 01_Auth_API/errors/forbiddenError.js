const CustomError = require('./customError');

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
