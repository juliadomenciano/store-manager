const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const { beforeEach } = require('mocha');

use(chaiAsPromised);

const getresults = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }
  ],
  code: 200
};



describe('productController', () => {

  describe('#getAll', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      const req = {}
      const res = {}

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub()

      sinon.stub(productService, 'getAll').resolves(getresults);
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true)
      expect(res.json.calledWith(getresults.message)).to.be.eq(true)


    });
  });



});