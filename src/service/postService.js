const { PostCategory, BlogPost, User, Category } = require('../models');
const { createNewPost } = require('../utills/validPost');

const createPost = async ({ email, title, content, categoryIds }) => {
  try {
    const validate = await createNewPost({ email, title, content, categoryIds });
    if (validate.status === 'SUCCESS') {
      const postsCategories = categoryIds.map((category) => ({
        postId: validate.data.id,
        categoryId: category,
      }));
      await PostCategory.bulkCreate(postsCategories);
      return { status: 'CREATED', data: validate.data };
    }
    return validate;
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: `ERROR: ${error.message}` } };
  }
};

const findPost = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return { status: 'SUCCESS', data: posts };
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: `ERROR: ${error.message}` } };
  }
};

const findPostByPk = async (id) => {
  try {
    const posts = await BlogPost.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }, 
        { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (posts) {
      return { status: 'SUCCESS', data: posts };
    }
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: `ERROR: ${error.message}` } };
  }
};

module.exports = { createPost, findPost, findPostByPk };
