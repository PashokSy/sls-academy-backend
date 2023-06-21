const { pool } = require('../db/connect');
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../errors');

const signIn = async (req, res) => {
  try {
    res.status(200).json({ message: 'singIn' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

const signUp = async (req, res) => {
  res.status(200).json({ message: 'sighUp' });
};

module.exports = {
  signIn,
  signUp,
};
