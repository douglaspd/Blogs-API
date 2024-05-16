const { PostCategory } = require('../models');
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
      return { status: 'CREATED', data: (await validate).data };
    }
    return validate;
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: `ERROR: ${error.message}` } };
  }
};

module.exports = {
  createPost,
};