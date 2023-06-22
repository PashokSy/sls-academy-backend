const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const authenticateToken = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthorizedError('Authentication invalid');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (error) {
    throw new UnauthorizedError('Authentication invalid');
  }
};

module.exports = authenticateToken;
