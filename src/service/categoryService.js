const { Category } = require('../models');
const validCategory = require('../utills/validCategory');

const createCategory = async (newCategory) => {
  try {
    const valid = validCategory(newCategory);
    if (valid.status === 'SUCCESS') {
      const category = await Category.create(newCategory);
      return { status: 'CREATED', data: { id: category.id, name: newCategory.name } };
    }
    return valid;
  } catch (error) {
    console.log(error);
    return { status: 'SERVER_ERROR', data: { message: 'Erro created' },
    };
  }
};

const findCategory = async () => {
  try {
    const category = await Category.findAll();
    if (category) {
      return { status: 'SUCCESS', data: category };
    }
    return { status: 'NOT_FOUND', data: { message: 'category not found' } };  
  } catch (error) {
    return { status: 'SERVER_ERROR', data: { message: 'Erro created' },
    };
  }
};

module.exports = {
  createCategory,
  findCategory,
};