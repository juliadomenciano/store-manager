const { expect } = require('chai');
const connection = require('../../models/connection');
const sinon = require('sinon');
const productModel = require('../../models/productModel');
const { beforeEach } = require('mocha');

const getresults = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]
const id = 1;
const wrongId = 25;
const productById = {
  "id": 1,
  "name": "Martelo de Thor"
}

describe('productModel', () => {
  describe('getAll', async () => {
    it('verifica se retorna todos os pordutos do StoreManager', () => {
      sinon.stub(connection, 'execute').resolves([getresults]);
      const result = await productModel.getAll();
      expect(result).to.be.eq(getresults)
    })
  })

  describe('findById', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna todos os pordutos com o id certo do StoreManager', () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.findById(id);
      expect(result).to.be.eq(productById)
    })

    it('verifica se retorna todos os pordutos com o id certo do StoreManager', () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.findById();
      expect(result).to.be.eq()
    })

  })  
  
});