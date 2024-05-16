const postService = require('../service/postService');
const mapStatus = require('./mapStatus');

const createPost = async (req, res) => {
  const { email } = req.user;
  const { title, content, categoryIds } = req.body;
  const { status, data } = await postService.createPost({ email, title, content, categoryIds });
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  createPost,
};
