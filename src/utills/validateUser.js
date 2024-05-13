const validateUser = (newUser) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const { displayName, email, password } = newUser;
  if (displayName.length < 8) {
    return { status: 'BAD_REQUEST', 
      data: { message: '"displayName" length must be at least 8 characters long' } };
  }
  if (!emailRegex.test(email)) {
    return { status: 'BAD_REQUEST', data: { message: '"email" must be a valid email' } };
  }
  if (password.length < 6) {
    return { status: 'BAD_REQUEST', 
      data: { message: '"password" length must be at least 6 characters long' } };
  }
  return { status: 'SUCCESS' };
};

module.exports = {
  validateUser,
};
