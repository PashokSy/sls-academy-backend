const signIn = async (req, res) => {
  res.status(200).json({ message: 'singIn' });
};

const signUp = async (req, res) => {
  res.status(200).json({ message: 'sighUp' });
};

module.exports = {
  signIn,
  signUp,
};
