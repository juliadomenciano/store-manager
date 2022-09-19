const { expect } = require('chai');
const connection = require('../../../models/connection');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const { beforeEach } = require('mocha');

const getresults = [
  {
    "saleId": 1,
    "date": "2022-07-05T21:42:35.000Z",
    "quantity": 5,
    "productId": 1
  },
  {
    "saleId": 1,
    "date": "2022-07-05T21:42:35.000Z",
    "quantity": 10,
    "productId": 2
  },
  {
    "saleId": 2,
    "date": "2022-07-05T21:42:35.000Z",
    "quantity": 15,
    "productId": 3
  }
];
const id = 1;
const wrongId = 25;
const productById = [
  {
    "date": "2022-07-05T21:42:35.000Z",
    "quantity": 5,
    "product_Id": 1
  },
  {
    "date": "2022-07-05T21:42:35.000Z",
    "quantity": 10,
    "product_Id": 2
  }
];
const addProduct = { "name": "Produto1" };

describe('salesModel', () => {

  // describe('#getAll', () => {
  //   it('verifica se retorna todos as vendas do StoreManager', async () => {
  //     sinon.stub(connection, 'execute').resolves([getresults]);
  //     const result = await salesModel.getAll();
  //     expect(result).to.be.eq(getresults)
  //   })
  // })

  // describe('#findById', async () => {
  //   beforeEach(() => {
  //     sinon.restore()
  //   });

  //   it('verifica se retorna todos as vendas com o id certo do StoreManager', async () => {
  //     sinon.stub(connection, 'execute').resolves([productById]);
  //     const result = await salesModel.findById(id);
  //     expect(result).to.be.eq(productById)
  //   })
  // });

  describe('#create', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se adiciona a venda corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await salesModel.create(id);
      expect(result).to.be.eq()
    });
  });

  describe('#list', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se atualiza a venda corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await salesModel.list();
      expect(result).to.be.eq(productById)
    });
  });

   describe('#remove', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se remove a venda corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await salesModel.remove(id);
      expect(result).to.be.eq()
    });
   });

});