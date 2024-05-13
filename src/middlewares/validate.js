const validBody = (email, password) => email && password;

const validate = (email, password) => {
  if (!validBody(email, password)) {
    return { status: 'BAD_REQUEST', 
      data: { message: 'Some required fields are missing' } };
  }
};

module.exports = validate;