const { pool } = require('../db/connect');

const getCurrentUser = async (req, res) => {
  res
    .status(200)
    .json({ success: true, data: { id: req.user.id, email: req.user.email } });
};

module.exports = {
  getCurrentUser,
};
