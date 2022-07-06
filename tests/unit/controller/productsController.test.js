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
const getresults2 = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 3, name: 'Escudo do Capitão América' }
  ],
  code: 200
};
const getresultsById = { message: [ { id: 1, name: 'Martelo de Thor' }], code: 200 };
const createResult = { message: [ { id: 4, name: 'Escudo do Capitão América' }], code: 200 };
const updateResult = { message: [{ id: 4, name: 'Escudo do Capitão Pátria' }], code: 200 };
const removeError = { message: { message: 'Product not found' }, code: 404 }



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

  describe('#findById', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      const req = {}
      const res = {}
      req.params = 1;

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub()

      sinon.stub(productService, 'findById').resolves(getresultsById);
      await productController.findById(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true)
      expect(res.json.calledWith(getresultsById.message)).to.be.eq(true)


    });
  });

  describe('#create', () => {
    beforeEach(() => {
      sinon.restore()
    });

    it('verifica se retorna a mensagem e o código corretamente', async () => {
      const req = {}
      const res = {}
      req.body = { name: 'Escudo do Capitão América' };

      res.status = sinon.stub().returns(res)
      res.json = sinon.stub()

      sinon.stub(productService, 'create').resolves(createResult);
      await productController.create(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true)
      expect(res.json.calledWith(createResult.message)).to.be.eq(true)


    });
  });

    describe('#update', () => {
      beforeEach(() => {
        sinon.restore()
      });

      it('verifica se retorna a mensagem e o código corretamente', async () => {
        const req = {}
        const res = {}
        req.body = { name: 'Escudo do Capitão Pátria' };
        req.params = 4;

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub()

        sinon.stub(productService, 'update').resolves(updateResult);
        await productController.update(req, res);

        expect(res.status.calledWith(200)).to.be.eq(true)
        expect(res.json.calledWith(updateResult.message)).to.be.eq(true)


      });
    });
  
    describe('#remove', () => {
      beforeEach(() => {
        sinon.restore()
      });

      it('verifica se retorna a mensagem e o código corretamente', async () => {
        const req = {}
        const res = {}
        req.params = 10;

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub()

        sinon.stub(productService, 'remove').resolves(removeError);
        await productController.remove(req, res);

        expect(res.status.calledWith(404)).to.be.eq(true)
        expect(res.json.calledWith(removeError.message)).to.be.eq(true)

      });

      it('verifica se retorna a mensagem e o código corretamente', async () => {
        const req = {}
        const res = {}
        req.params = 1;

        res.status = sinon.stub().returns(res)
        res.send = sinon.stub()

        sinon.stub(productService, 'remove').resolves(204);
        await productController.remove(req, res);

        expect(res.status.calledWith(204)).to.be.eq(true)


      });


    });

      describe('#searchTerm', () => {
      beforeEach(() => {
        sinon.restore()
      });

      it('verifica se retorna a mensagem e o código corretamente', async () => {
        const req = {}
        const res = {}
        req.query = 'América';

        res.status = sinon.stub().returns(res)
        res.json = sinon.stub()

        sinon.stub(productService, 'searchTerm').resolves(createResult);
        await productController.searchTerm(req, res);

        expect(res.status.calledWith(200)).to.be.eq(true)
        expect(res.json.calledWith(createResult.message)).to.be.eq(true);

      });
    });

});