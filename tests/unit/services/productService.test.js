const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const mockProducts = require('../mocks/mockProducts');

describe('Tests the products\' service layer', () => {
  describe('The function getAll', () => {
    beforeEach(() => {
      sinon.stub(productModel, 'getAll').resolves(mockProducts);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const response = await productService.getAll();
      expect(response).to.be.a('object');
    });
    it('should return object with a code and an array of products', async () => {
      const response = await productService.getAll();
      expect(response).to.be.deep.equal({ code: 200, products: mockProducts });
    });
    it('should return an array sorted by id', async () => {
      const response = await productService.getAll();
      expect(response.products[0]).to.have.property('id', 1);
      expect(response.products[1]).to.have.property('id', 2);
    });
    it('should return an object with the code 200', async () => {
      const response = await productService.getAll();
      expect(response.code).to.be.equal(200);
    })
  });
  describe('The function findById', () => {
    describe('if the product exists', () => {
      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves([mockProducts[0]]);
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return an object', async () => {
        const response = await productService.findById(1);
        expect(response).to.be.a('object');
      });
      it('should return the code 200', async () => {
        const response = await productService.findById(1);
        expect(response.code).to.be.equal(200);
      });
      it('should return an object with the key project and id correct', async () => {
        const response = await productService.findById(1);
        expect(response.product).to.be.deep.equal(mockProducts[0]);
      });
    });
    describe('if the product doesn\'t exists', () => {
      beforeEach(() => {
        sinon.stub(productModel, 'findById').resolves([]);
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return an object', async () => {
        const response = await productService.findById(4);
        expect(response).to.be.a('object');
      });
      it('should return an object with the code 404', async () => {
        const response = await productService.findById(4);
        expect(response.code).to.be.equal(404);
      });
      it('should return a message', async () => {
        const response = await productService.findById(4);
        expect(response.message).to.be.equal('Product not found');
      });
    });
  });
  describe('The function addProduct', () => {
    describe('If the name is incorrect', () => {
      beforeEach(() => {
        sinon.stub(productModel, 'addProduct').resolves({ id: 4 });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return an object', async () => {
        const response = await productService.addProduct({ name: 'Cellphone' });
        expect(response).to.be.a('object');
      });
      it('if there is no name, should return an object with the code 400', async () => {
        const response = await productService.addProduct({});
        expect(response.code).to.be.equal(400);
      });
      it('if the name has less than 5 letters, should return an object with the code 422', async () => {
        const response = await productService.addProduct({ name: 'cel' });
        expect(response.code).to.be.equal(422);
      });
      it('if there is no name, should return a message', async () => {
        const response = await productService.addProduct({});
        expect(response.message).to.be.equal('"name" is required');
      });
      it('if the name has less than 5 letters, should return amessage', async () => {
        const response = await productService.addProduct({ name: 'cel' });
        expect(response.message).to.be.equal('"name" length must be at least 5 characters long');
      });
    });
    describe('If the name is correct', () => {
      beforeEach(() => {
        sinon.stub(productModel, 'addProduct').resolves({ id: 4 });
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return an object', async () => {
        const response = await productService.addProduct({ name: 'Cellphone' });
        expect(response).to.be.a('object');
      });
      it('should return an object with the code 201', async () => {
        const response = await productService.addProduct({ name: 'Cellphone' });
        expect(response.code).to.be.equal(201);
      });
      it('should return the product created', async () => {
        const response = await productService.addProduct({ name: 'Cellphone' });
        expect(response.product).to.be.deep.equal({ id: 4, name: 'Cellphone' });
      });
    });
  });
})
