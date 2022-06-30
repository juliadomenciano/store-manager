const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const result = await salesService.getAll();
  res.status(result.code).json(result.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findById(id);
  res.status(result.code).json(result.message);
};

const create = async (req, res) => {
  const result = await salesService.create(req.body);
  res.status(result.code).json(result.message);
};

module.exports = {
  create,
  getAll,
  findById,
};