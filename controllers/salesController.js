const salesService = require('../services/salesService');
const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  return res.status(result.code).json(result.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  return res.status(result.code).json(result.message);
};

const create = async (req, res) => {
  const data = req.body;
  await salesService.validateBodyAdd(req.body);
  const result = await salesService.create(data);
  return res.status(result.code).json(result.message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.remove(id);
  if (result === 204) return res.status(204).send();
  return res.status(result.code).json(result.message);
};
const update = async (req, res) => {
  const { id } = req.params;
  const checkId = await salesService.findById(id);
  if (checkId.code !== 200) return res.status(checkId.code).json(checkId.message);
  const checkId2 = await Promise.all(req.body
    .map((item) => productService.findById(item.productId)));
  const arr = checkId2.find((item) => item.code === 404);
  if (arr) return res.status(404).json({ message: 'Product not found' });
  await salesService.validateBodyAdd(req.body);
  const result = await salesService.update(id, req.body);
  if (result.code !== 200) return res.status(500).send();
  return res.status(result.code).json(result.message);
};

module.exports = {
  create,
  getAll,
  findById,
  remove,
  update,
};