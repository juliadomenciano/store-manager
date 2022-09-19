const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const { beforeEach } = require('mocha');

use(chaiAsPromised);

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

const getresultsById = [{ "id": 1, "name": "Martelo de Thor" }];
const resReturned = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }
  ],
  code: 200
};

const modelReturn = [{ id: 4, name: 'Produto1' }]; 
const created = { message: modelReturn[0], code: 201 };
const byId = { message: getresultsById[0], code: 200 };
const updatedb = { id: 1, name: 'Martelo de Thor' };
const getByName = [{ id: 1, name: 'Martelo de Thor' }];
const update = { message: updatedb, code: 200 };
const searchByName = { message: getByName, code: 200 };
// const searchByWrongName = { message: getresults, code: 200 };



describe('productServices', () => {

  describe('#getAll', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'getAll').resolves(getresults);
      const result = await productService.getAll();
      return expect(result).to.eql(resReturned)
    });
  });

   describe('#create', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'create').resolves(modelReturn);
      const result = await productService.create({ name: 'Martelo de Thor' });
      return expect(result).to.eql(created)
    });
   });
  
  describe('#findById', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'findById').resolves(getresultsById);
      const result = await productService.findById({ name: 'Martelo de Thor' });
      return expect(result).to.eql(byId)
    });
  });

   describe('#update', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'update').resolves();
      const result = await productService.update({ id: 1, name: 'Martelo de Thor' });
      return expect(result).to.eql(update)
    });
   });
  
  describe('#remove', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'remove').resolves();
      const result = await productService.remove(1);
      return expect(result).to.eql(204)
    });
  });

  describe('#searchTerm', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'searchTerm').resolves(getByName);
      const result = await productService.searchTerm('Martelo');
      return expect(result).to.eql(searchByName)
    });

    // it('verifica se retorna a mensagem de erro corretamente', async () => {
    //   sinon.stub(productsModel, 'searchTerm').resolves(getresults);
    //   const result = await productService.searchTerm('xyz');
    //   return expect(result).to.eql(searchByWrongName)
    // });
    

  });

});