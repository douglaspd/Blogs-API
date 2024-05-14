const { User } = require('../models');

const findAllUser = async () => {
  try {
    const allUser = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    if (allUser) {
      return { status: 'SUCCESS', data: allUser };
    }
    return { status: 'NOT_FOUND', data: { message: 'Not_found' } };
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: 'Server error' } };
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      return { status: 'SUCCESS', data: user }; 
    }
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: 'Server error' } };
  }
};

module.exports = {
  findAllUser,
  findUserById,
};