require('dotenv').config();
const { pool } = require('../db/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  const user = await pool.query(
    'SELECT user_id, user_email, user_password FROM users WHERE user_email = $1',
    [email]
  );
  if (user.rows.length === 0) {
    throw new NotFoundError(`User ${email} not found`);
  }
  // password don't match
  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );
  if (!validPassword) {
    throw new ForbiddenError(`Password incorrect`);
  }

  // generate access token
  const accessToken = jwt.sign(
    { id: user.rows[0].user_id, email: user.rows[0].user_email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_TTL,
    }
  );
  // get refresh token
  const getRefreshToken = await pool.query(
    'SELECT refresh_token FROM tokens WHERE user_id = $1',
    [user.rows[0].user_id]
  );

  res.status(200).json({
    success: true,
    data: {
      id: user.rows[0].user_id,
      accessToken: accessToken,
      refreshToken: getRefreshToken.rows[0].refresh_token,
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
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    throw new BadRequestError('Please provide valid email');
  }
  // email not unique
  const user = await pool.query(
    'SELECT user_email FROM users WHERE user_email = $1',
    [email]
  );
  if (user.rows.length != 0) {
    throw new ConflictError(`User with email ${email} already exists`);
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // create new user in database
  let newUser;
  try {
    newUser = await pool.query(
      'INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
  } catch (error) {
    throw new ConflictError('Failed to create new user');
  }
  // generate tokens
  const accessToken = jwt.sign(
    { id: newUser.rows[0].user_id, email: newUser.rows[0].user_email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_TTL,
    }
  );
  const refreshToken = jwt.sign(
    { id: newUser.rows[0].user_id, email: newUser.rows[0].user_email },
    process.env.TOKEN_SECRET
  );
  // insert token to database
  try {
    await pool.query(
      'INSERT INTO tokens(refresh_token, user_id) VALUES ($1, $2)',
      [refreshToken, newUser.rows[0].user_id]
    );
  } catch (error) {
    // token insertion failed
    await pool.query('DELETE FROM users WHERE user_id = $1', [
      newUser.rows[0].user_id,
    ]);
    throw new ConflictError('Failed to create new user');
  }

  res.status(201).json({
    success: true,
    data: {
      id: newUser.rows[0].user_id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
};

module.exports = {
  signIn,
  signUp,
};
