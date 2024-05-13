const { User } = require('../models');
const auth = require('../utills/auth');

const login = async (email, password) => {
  try { 
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user || user.password !== password) {
      return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
    }
    const tokenAuth = auth.createToken({ id: user.id,
      email: user.email, 
      displayName: user.display_name,
      expiresIn: '1h',
    });
    return { status: 'SUCCESS', data: { token: tokenAuth } };
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro created' },
    };
  }
};

module.exports = {
  login,
};