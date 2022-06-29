const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const mockProducts = require('../mocks/mockProducts');

describe('Test the products\' controller layer', () => {
  describe('The function getAll', () => {
    const request = {};
    const response = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves({ code: 200, products: mockProducts });
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return the code 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('should return the array of projects in a json', async () => {
      await productController.getAll(request, response);
      expect(response.json.calledWith({ products: mockProducts }));
    });
  });
  describe('The function findById', () => {
    describe('If the product exists', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'findById').resolves({ code: 200, product: mockProducts[0] });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return the code 200', async () => {
        await productController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('should return an object with the product in a json', async () => {
        await productController.findById(request, response);
        expect(response.json.calledWith(mockProducts[0]))
          .to.be.true;
      });
    });
    describe('If the product doesn\'t exists', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = { id: 4 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'findById').resolves({ code: 404, message: 'Product not found' });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return the code 404', async () => {
        await productController.findById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });
      it('should return an object with the product in a json', async () => {
        await productController.findById(request, response);
        expect(response.json.calledWith({ message: 'Product not found' }))
          .to.be.true;
      });
    });
  });
});
