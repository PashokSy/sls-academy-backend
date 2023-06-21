const { pool } = require('../db/connect');
const bcrypt = require('bcrypt');

const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'getCurrentUser' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCurrentUser,
};
