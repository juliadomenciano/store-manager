const { expect } = require('chai');
const connection = require('../../../models/connection');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');
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
];
const id = 1;
const wrongId = 25;
const productById = { "id": 1, "name": "Martelo de Thor" };
const addProduct = { "name": "Produto1" };
const updateProduct = { "name": "Martelo do Batman" };
const term = 'martelo';

describe('productModel', () => {
  describe('#getAll', () => {
    it('verifica se retorna todos os pordutos do StoreManager', async () => {
      sinon.stub(connection, 'execute').resolves([getresults]);
      const result = await productModel.getAll();
      expect(result).to.be.eq(getresults)
    })
  })

  describe('#findById', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna todos os pordutos com o id certo do StoreManager', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.findById(id);
      expect(result).to.be.eq(productById)
    })
  });

  describe('#create', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se adiciona o produto corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.create(addProduct);
      expect(result).to.be.eq(productById)
    });
  });

  describe('#update', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se atualiza o produto corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.update(updateProduct);
      expect(result).to.be.eq(productById)
    });
  });

   describe('#remove', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se remove o produto corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.remove(id);
      expect(result).to.be.eq()
    });
   });
  
     describe('#searchTerm', async () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se faz a busca do produto por termo corretamente', async () => {
      sinon.stub(connection, 'execute').resolves([productById]);
      const result = await productModel.searchTerm(term);
      expect(result).to.be.eq(productById)
    });
  });


});