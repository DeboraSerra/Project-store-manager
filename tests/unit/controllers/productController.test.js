const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController = require('../../../controllers/productController');
const mockProducts = require('../mocks/mockProducts');
const productModel = require('../../../models/productModel');

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
  describe('The function addProduct', () => {
    describe('if the name is correct', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.body = {
          name: 'Cellphone'
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'addProduct')
          .resolves({ code: 201, product: { id: 4, name: 'Cellphone' } });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 201', async () => {
        await productController.addProduct(request, response);
        expect(response.status.calledWith(201)).to.be.true;
      });
      it('should return the product created', async () => {
        await productController.addProduct(request, response);
        expect(response.json.calledWith({ id: 4, name: 'Cellphone' }))
          .to.be.true;
      });
    });
    describe('if the name has less the 5 letters', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.body = {
          name: 'Cel'
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'addProduct')
          .resolves({ code: 422, message: '"name" length must be at least 5 characters long' });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 422', async () => {
        await productController.addProduct(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });
      it('should return a message', async () => {
        await productController.addProduct(request, response);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' }))
          .to.be.true;
      });
    });
    describe('if there is no name', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.body = {
          name: ''
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'addProduct')
          .resolves({ code: 400, message: '"name" is required' });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 400', async () => {
        await productController.addProduct(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });
      it('should return a message', async () => {
        await productController.addProduct(request, response);
        expect(response.json.calledWith({ message: '"name" is required' }))
          .to.be.true;
      });
    });
  });
  describe('The function updateProduct', () => {
    describe('if the name and id are correct', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = {
          id: 1,
        }
        request.body = {
          name: 'Cellphone'
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'updateProduct')
          .resolves({ code: 200, id: 1, name: 'Cellphone' });
        sinon.stub(productModel, 'findById')
          .resolves([{ id: 1, name: 'Martelo' }]);
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 200', async () => {
        await productController.updateProduct(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('should return the product created', async () => {
        await productController.updateProduct(request, response);
        expect(response.json.calledWith({ id: 1, name: 'Cellphone' }))
          .to.be.true;
      });
    });
    describe('if the name has less the 5 letters', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = {
          id: 1,
        }
        request.body = {
          name: 'Cel'
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'updateProduct')
          .resolves({ code: 422, message: '"name" length must be at least 5 characters long' });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 422', async () => {
        await productController.updateProduct(request, response);
        expect(response.status.calledWith(422)).to.be.true;
      });
      it('should return a message', async () => {
        await productController.updateProduct(request, response);
        expect(response.json.calledWith({ message: '"name" length must be at least 5 characters long' }))
          .to.be.true;
      });
    });
    describe('if there is no name', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = {
          id: 1,
        }
        request.body = {
          name: ''
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'updateProduct')
          .resolves({ code: 400, message: '"name" is required' });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 400', async () => {
        await productController.updateProduct(request, response);
        expect(response.status.calledWith(400)).to.be.true;
      });
      it('should return a message', async () => {
        await productController.updateProduct(request, response);
        expect(response.json.calledWith({ message: '"name" is required' }))
          .to.be.true;
      });
    });
    describe('if the id is incorrect', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = {
          id: 99,
        }
        request.body = {
          name: 'Cellphone'
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'addProduct')
          .resolves({ code: 404, message: 'Product not found' });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return status 404', async () => {
        await productController.updateProduct(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });
      it('should return a message', async () => {
        await productController.updateProduct(request, response);
        expect(response.json.calledWith({ message: 'Product not found' }))
          .to.be.true;
      });
    });
  });
  describe('The function delete', () => {
    describe('if the id exists', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = {
          id: 1,
        }
        response.status = sinon.stub().returns(response);
        response.end = sinon.stub().returns();
        sinon.stub(productService, 'delete')
          .resolves({ code: 204 });
        sinon.stub(productModel, 'findById').resolves([mockProducts[0]]);
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return the code 204', async () => {
        await productController.delete(request, response);
        expect(response.status.calledWith(204)).to.be.true;
      });
    });
    describe('if the id doesn\'t exist', () => {
      const request = {};
      const response = {};
      beforeEach(() => {
        request.params = {
          id: 99,
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'delete')
          .resolves({ code: 404, message: 'Product not found' });
      });
      afterEach(() => {
        sinon.restore();
      })
      it('should return the code 404', async () => {
        await productController.delete(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });
      it('should return a message', async () => {
        await productController.delete(request, response);
        expect(response.json.calledWith({ message: 'Product not found' }))
          .to.be.true;
      });
    });
  });
});
