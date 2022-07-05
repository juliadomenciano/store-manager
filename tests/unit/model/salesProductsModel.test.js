const { expect } = require('chai');
const connection = require('../../../models/connection');
const sinon = require('sinon');
const salesProductsModel = require('../../../models/salesProductsModel');
const { beforeEach } = require('mocha');

const createSale = { "id": 3, "productId": 10, "quantity":1 };
const productById = { "id": 1, "name": "Martelo de Thor" };

describe('salesProductModel', () => {

  describe('#create', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se adiciona o produto corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await salesProductsModel.create(createSale);
      expect(result).to.be.eq()
    });
  });

  // describe('#update', async () => {
  //   beforeEach(() => {
  //     sinon.restore()
  //   });

  //   it('verifica se atualiza o produto corretamente', async () => {
  //     sinon.stub(connection, 'execute').resolves([productById]);
  //     const result = await salesProductsModel.update(updateProduct);
  //     expect(result).to.be.eq(productById)
  //   });
  // });

});