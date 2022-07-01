// const Joi = require('joi');
const productModel = require('../models/productModel');

// const productValidation = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//   }).validate(data);
//   const schema2 = Joi.object({
//     name: Joi.string().min(5),
//   }).validate(data);
//   if (schema.err) {
//     return { message: schema.error.details[0].message, code: 400 }; 
//   }
//   if (schema2.error) {
//     return { message: schema2.error.details[0].message, code: 422 }; 
//   }
//   return {};
// };
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
  // const validation = productValidation(data);
  // if (validation !== {}) return { message: validation.message, code: validation.code };
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
  const { id } = data;
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