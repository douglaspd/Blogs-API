const validCategory = (newCategory) => {
  const { name } = newCategory;
  if (!name || name === '') {
    return {
      status: 'BAD_REQUEST',
      data: { message: '"name" is required' },
    };
  }
  return { status: 'SUCCESS' };
};

module.exports = validCategory;