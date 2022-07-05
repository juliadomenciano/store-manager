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

const resReturned = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }
  ],
  code: 200
};

const modelReturn = [{ id: 4, name: 'Produto1' }] 
const created = { message: modelReturn[0], code: 201 }



describe.only('productServices', () => {

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
      console.log(result)
      console.log(created)
      return expect(result).to.eql(created)
    });
   });
  
  describe('#findById', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      sinon.stub(productsModel, 'findById').resolves(modelReturn);
      const result = await productService.findById({ name: 'Martelo de Thor' });
      console.log(result)
      console.log(created)
      return expect(result).to.eql(created)
    });
  });

});