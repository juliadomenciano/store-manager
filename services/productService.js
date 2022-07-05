const productModel = require('../models/productModel');

const getAll = async () => {
  const result = await productModel.getAll();
  if (!result.length) return { message: { message: 'Product not found' }, code: 404 };
  return { message: result, code: 200 };
};

const findById = async (data) => {
  const result = await productModel.findById(data);
  if (!result.length) return { message: { message: 'Product not found' }, code: 404 };
  return { message: result[0], code: 200 };
};

const create = async (data) => {
  if (!data.name) return { message: { message: '"name" is required' }, code: 400 };
  if (data.name.length < 5) {
 return {
    message: { message: '"name" length must be at least 5 characters long' },
    code: 422,
  }; 
}
  const result = await productModel.create(data.name);
  return { message: result[0], code: 201 };
};

const update = async (data) => {
  const { id, name } = data;
  if (!name) return { message: { message: '"name" is required' }, code: 400 };
   if (data.name.length < 5) {
 return {
    message: { message: '"name" length must be at least 5 characters long' },
    code: 422,
  }; 
}
  const validateId = await productModel.findById(id);
  if (!validateId.length) return { message: { message: 'Product not found' }, code: 404 };
  await productModel.update(data);
  return { message: data, code: 200 };
};

const remove = async (data) => {
  const validateId = await productModel.findById(data);
  if (!validateId.length) return { message: { message: 'Product not found' }, code: 404 };
  await productModel.remove(data);
  return 204;
};

const searchTerm = async (data) => {
  const result = await productModel.searchTerm(data);
  if (!result.length) {
    const getAllResults = await productModel.getAll();
    return { message: getAllResults, code: 200 };
  }
  return { message: result, code: 200 };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  searchTerm,
};