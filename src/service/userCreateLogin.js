const { User } = require('../models');
const auth = require('../utills/auth');
const { validateUser } = require('../utills/validateUser');

const login = async (email, password) => {
  try { 
    const user = await User.findOne({ where: { email } });
    console.log('aqui', user);
    if (!user || user.password !== password) {
      return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
    }
    const tokenAuth = auth.createToken({ email: user.email });
    return { status: 'SUCCESS', data: { token: tokenAuth } };
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro created' },
    };
  }
};

const validUserExist = async (newUser) => {
  const validUser = validateUser(newUser);
  if (validUser.status === 'SUCCESS') {
    const existUser = await User.findOne({ where: { email: newUser.email } });
    if (existUser) {
      return { status: 'CONFLICT', data: { message: 'User already registered' } };
    }
    return { status: 'SUCCESS' };
  }
  return validUser;
};

const createUser = async (newUser) => {
  try {
    const valid = await validUserExist(newUser);
    if (valid.status === 'SUCCESS') {
      const user = await User.create(newUser);
      const tokenAuth = auth.createToken({ email: user.email });
      return { status: 'CREATED', data: { token: tokenAuth } };
    }
    return valid;
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro created' },
    };
  }
};

module.exports = {
  login,
  createUser,
};