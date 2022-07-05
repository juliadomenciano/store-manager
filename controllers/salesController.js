const salesService = require('../services/salesService');

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

module.exports = {
  create,
  getAll,
  findById,
  remove,
};