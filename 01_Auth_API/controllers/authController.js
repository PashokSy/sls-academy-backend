const { pool } = require('../db/connect');
const bcrypt = require('bcrypt');
const { NotFoundError, ConflictError } = require('../errors');

const signIn = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  res.status(200).json({ message: 'singIn' });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  //email and password empty strings
  if (!email || !password) {
    throw new ConflictError('Please provide email and password');
  }

  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    throw new ConflictError('Please provide valid email');
  }

  // TODO check for email dups

  // temporary
  const accessToken = 'accessToken-test';
  const refreshToken = 'refreshToken-test';

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await pool.query(
    'INSERT INTO users (user_email, user_password, access_token, refresh_token) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, accessToken, refreshToken]
  );

  res.status(201).json({
    success: true,
    data: {
      id: newUser.rows[0].id,
      accessToken: newUser.rows[0].access_token,
      refreshToken: newUser.rows[0].refresh_token,
    },
  });
};

module.exports = {
  signIn,
  signUp,
};
