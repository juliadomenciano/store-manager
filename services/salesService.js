const Joi = require('joi');
const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const salesProductsModel = require('../models/salesProductsModel');
// const notFoundError = require('../middlewares/notFoundError');
const { runSchema } = require('./validation');

const salesService = {

  validateBodyAdd: runSchema(Joi.array().items(Joi.object({
      productId: Joi.number().required().label('productId'),
      quantity: Joi.number().integer().greater(0).required()
        .label('quantity'),
    }))),

  create: async (data) => {
    const arrayOfId = data.map((item) => item.productId);
      console.log(arrayOfId);
    const result = await productModel.getAll();
    const matchIds = result.map((item) => item.id);
console.log(matchIds);
    arrayOfId.forEach((item) => {
      if (!matchIds.includes(item)) {
        throw new Error('Product not found');
      }
    });
    const getSalesId = await salesModel.list();
    const salesId = getSalesId.length + 1;
    await salesModel.create(salesId);
    await Promise.all(data.map((item) => salesProductsModel.create({ ...item, salesId })));
    return { message: { id: salesId, itemsSold: data }, code: 201 };
  },

  getAll: async () => {
    const result = await salesModel.getAll();
    if (!result.length) return { message: { message: 'Sale not found' }, code: 404 };
    return { message: result, code: 200 };
  },

  findById: async (data) => {
    const result = await salesModel.findById(data);
    if (!result.length) return { message: { message: 'Sale not found' }, code: 404 };
    return { message: result, code: 200 };
  },

  remove: async (data) => {
    const validateId = await salesModel.findById(data);
    if (!validateId.length) return { message: { message: 'Sale not found' }, code: 404 };
    await salesModel.remove(data);
    return 204;
  },
  
};

module.exports = salesService;