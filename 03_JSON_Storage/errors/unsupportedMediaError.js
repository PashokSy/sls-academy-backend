const CustomError = require('./customError');

class UnsupportedMediaType extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 415;
  }
}

module.exports = UnsupportedMediaType;
