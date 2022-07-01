const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const result = await productService.getAll();
  res.status(result.code).json(result.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await productService.findById(id);
  res.status(result.code).json(result.message);
};

const create = async (req, res) => {
  const result = await productService.create(req.body);
  res.status(result.code).json(result.message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productService.update({ id, name });
  res.status(result.code).json(result.message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await productService.remove(id);
  if (result === 204) return res.status(204).send();
  res.status(result.code).json(result.message);
};

const searchTerm = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const result = await productService.searchTerm(q);
  res.status(result.code).json(result.message);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  searchTerm,
  
};