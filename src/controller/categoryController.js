const mapStatus = require('./mapStatus');
const categoryService = require('../service/categoryService');

const createCategory = async (req, res) => {
  const newCategory = req.body;
  const { status, data } = await categoryService.createCategory(newCategory);
  return res.status(mapStatus(status)).json(data);
};

module.exports = {
  createCategory,
};