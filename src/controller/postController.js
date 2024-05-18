const postService = require('../service/postService');
const postUpdateService = require('../service/postUptadeService');
const mapStatus = require('./mapStatus');

const createPost = async (req, res) => {
  const { email } = req.user;
  const { title, content, categoryIds } = req.body;
  const { status, data } = await postService.createPost({ email, title, content, categoryIds });
  return res.status(mapStatus(status)).json(data);
};

const findPost = async (req, res) => {
  const { status, data } = await postService.findPost();
  return res.status(mapStatus(status)).json(data);
};

const findPostByPk = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.findPostByPk(id);
  return res.status(mapStatus(status)).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { title, content } = req.body;
  const { status, data } = await postUpdateService.updatePost({ id, email, title, content });
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  createPost,
  findPost,
  findPostByPk,
  updatePost,
};
