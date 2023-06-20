const getCurrentUser = async (req, res) => {
  res.status(200).json({ message: 'getCurrentUser' });
};

module.exports = {
  getCurrentUser,
};
