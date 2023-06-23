const { NotFoundError } = require('../errors');
const { userFindOneByEmail } = require('../utils');

const getCurrentUser = async (req, res) => {
  const user = await userFindOneByEmail(req.user.email);
  // user not exists in db
  if (!user) {
    throw new NotFoundError(`User ${req.user.email} not found`);
  }

  res.status(200).json({
    success: true,
    data: { id: user.user_id, email: user.user_email },
  });
};

module.exports = {
  getCurrentUser,
};
