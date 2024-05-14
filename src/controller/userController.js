const mapStatus = require('./mapStatus');
const userService = require('../service/userCreateLogin');
const userFind = require('../service/userFind');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    return res.status(mapStatus('BAD_REQUEST')).json({
      message: 'Some required fields are missing',
    }); 
  }
  const { status, data } = await userService.login(email, password);
  return res.status(mapStatus(status)).json(data);
};

const createUser = async (req, res) => {
  const newUser = req.body;
  const { status, data } = await userService.createUser(newUser);
  return res.status(mapStatus(status)).json(data);
};

const findUser = async (req, res) => {
  const { status, data } = await userFind.findAllUser();
  console.log(status, data);
  return res.status(mapStatus(status)).json(data);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userFind.findUserById(id);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  login,
  createUser,
  findUser,
  findUserById,
};