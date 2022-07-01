const Joi = require('joi');
const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

  const schema = Joi.array().items(Joi.object({
    productId: Joi.number().required().label('productId'),
    quantity: Joi.number().required().label('quantity'),
  }));

   const schema2 = Joi.array().items(Joi.object({
    productId: Joi.number().required().label('productId'),
    quantity: Joi.number().min(1).required().label('quantity'),
  }));

const create = async (data) => {
   const { error } = schema.validate(data);
    if (error) {
      return { message: { message: error }, code: 400 };
    }
  
  const { error2 } = schema2.validate(data);
    if (error2) {
      return { message: { message: error2 }, code: 422 };
    }
 
  const getSalesId = await salesModel.getAll();
  const salesId = getSalesId.length + 1;
  await salesModel.create(salesId);
  await Promise.all(data.map((item) => salesProductsModel.create({ ...item, salesId })));

  return { message: { id: salesId, itemSold: data }, code: 201 };
};

const getAll = async () => {
  const result = await salesModel.getAll();
  if (!result.length) return { message: { message: 'sale not found' }, code: 404 };
  return { message: result, code: 200 };
};

const findById = async (data) => {
  const result = await salesModel.findById(data);
  if (!result.length) return { message: { message: 'sale not found' }, code: 404 };
  return { message: result, code: 200 };
};

const remove = async (data) => {
  const validateId = await salesModel.findById(data);
  if (!validateId.length) return { message: { message: 'sale not found' }, code: 404 };
  await salesModel.remove(data);
  return 204;
};

module.exports = {
  create,
  getAll,
  findById,
  remove,

};