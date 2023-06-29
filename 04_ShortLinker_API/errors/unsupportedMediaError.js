const CustomError = require('./customError');

class UnsupportedMediaTypeError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 415;
  }
}

module.exports = UnsupportedMediaTypeError;
