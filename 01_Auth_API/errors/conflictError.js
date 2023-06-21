const CustomError = require('./customError');

class ConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 409; // Conflict
  }
}

module.exports = ConflictError;
