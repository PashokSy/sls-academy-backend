require('dotenv').config();
const bcrypt = require('bcrypt');
const {
  generateTokens,
  validEmail,
  userFindOneByEmail,
  userInsert,
  userDeleteById,
} = require('../utils');
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
} = require('../errors');

const signIn = async (req, res) => {
  const { email, password } = req.body;

  // email or password empty strings
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  // user not registered
  const user = await userFindOneByEmail(email);
  if (!user) {
    throw new NotFoundError(`User ${email} not found`);
  }
  // password don't match
  const validPassword = await bcrypt.compare(password, user.user_password);
  if (!validPassword) {
    throw new ForbiddenError(`Password incorrect`);
  }

  // generate tokens
  let jwTokens;
  try {
    jwTokens = generateTokens(user);
  } catch (error) {
    // error handler will processes error and send 500 to client
  }

  res.status(200).json({
    success: true,
    data: {
      id: user.user_id,
      accessToken: jwTokens.accessToken,
      refreshToken: jwTokens.refreshToken,
    },
  });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  // email or password empty strings
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  // email validation
  if (!validEmail(email)) {
    throw new BadRequestError('Please provide valid email');
  }
  // email not unique
  const user = await userFindOneByEmail(email);
  if (user) {
    throw new ConflictError(`User with email ${email} already exists`);
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // create new user in database
  let newUser;
  try {
    newUser = await userInsert({ email, hashedPassword });
  } catch (error) {
    throw new ConflictError('Unable to create new user');
  }
  // generate tokens
  let jwTokens;
  try {
    jwTokens = generateTokens(newUser);
  } catch (error) {
    userDeleteById(newUser.user_id);
    throw new ConflictError('Unable to create new user');
  }

  res.status(201).json({
    success: true,
    data: {
      id: newUser.user_id,
      accessToken: jwTokens.accessToken,
      refreshToken: jwTokens.refreshToken,
    },
  });
};

module.exports = {
  signIn,
  signUp,
};
