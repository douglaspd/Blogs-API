const { User, BlogPost, Category } = require('../models');

const validPost = async ({ title, content, categoryIds }) => {
  if (title === '' || content === '' || categoryIds.length < 1) {
    return { status: 'BAD_REQUEST', data: { message: 'Some required fields are missing' } };
  }
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  }
  return { status: 'SUCCESS' };
};

const createNewPost = async ({ email, title, content, categoryIds }) => {
  try {
    const validate = await validPost({ email, title, content, categoryIds });
    if (validate.status === 'SUCCESS') {
      const user = await User.findOne({ where: { email } });
      const newPost = await BlogPost.create({ 
        title,
        content,
        userId: user.id,
        published: new Date(),
        updated: new Date(),
      });
      return { status: 'SUCCESS', data: newPost };
    }
    return validate;
  } catch (erro) {
    return { status: 'SERVER_ERROR', data: { message: `erro: ${erro.message}` } };
  }
};

const validUpdate = async ({ title, content }) => {
  if (title === '' || content === '') {
    return { status: 'BAD_REQUEST', data: { message: 'Some required fields are missing' } };
  }
  return { status: 'SUCCESS' };
};

module.exports = {
  createNewPost,
  validUpdate,
};