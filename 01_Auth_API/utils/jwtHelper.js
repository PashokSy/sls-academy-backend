const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.user_id, email: user.user_email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_TTL,
    }
  );
  const refreshToken = jwt.sign(
    { id: user.user_id, email: user.user_email },
    process.env.TOKEN_SECRET
  );

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
