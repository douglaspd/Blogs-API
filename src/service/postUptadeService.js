const { BlogPost, User, Category } = require('../models');
const { validUpdate } = require('../utills/validPost');

const updatePost = async ({ id, email, title, content }) => {
  try {
    const updateValid = validUpdate({ title, content });
    if ((await updateValid).status === 'SUCCESS') {
      const post = await BlogPost.findByPk(id, {
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
          { model: Category, as: 'categories', through: { attributes: [] } }],
      });
      if (email !== post.user.email) {
        return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
      }
      const newPost = await post.update({
        title, content, published: new Date(), updated: new Date() });
      return { status: 'SUCCESS', data: newPost };  
    }
    return updateValid;
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: `ERROR: ${error.message}` } };
  }
};

module.exports = {
  updatePost,
};