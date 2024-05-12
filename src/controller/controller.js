const mapStatus = require('./mapStatus');
const userService = require('../service/service');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.status(mapStatus('BAD_REQUEST')).json({
      message: 'Some required fields are missing',
    }); 
  }
  const { status, data } = await userService.login(email, password);
  console.log(status, data);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  login,
};