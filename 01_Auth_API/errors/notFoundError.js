const CustomError = require('./customError');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 404; // Not Found
  }
}

module.exports = NotFoundError;
