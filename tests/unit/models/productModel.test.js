const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../../../models/connection');
const productModel = require('../../../models/productModel');
const mockProducts = require('../mocks/mockProducts');

describe('Testing the products\' model layer', () => {
  describe('The function getAll', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').resolves([mockProducts]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const response = await productModel.getAll();
      expect(response).to.be.a('array');
    });
    it('should return an array of products', async () => {
      const response = await productModel.getAll();
      expect(response).to.be.deep.equal(mockProducts);
    });
  });
  describe('The function findById', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').resolves([[mockProducts[0]]]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const response = await productModel.findById(1);
      expect(response).to.be.a('array');
    });
    it('should return an array with an object of the right product', async () => {
      const response = await productModel.findById(1);
      expect(response).to.be.deep.equal([mockProducts[0]]);
    });
  });
  describe('The function addProduct', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').resolves([{ insertId: 4 }]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an object', async () => {
      const response = await productModel.addProduct({ name: 'Cellphone' });
      expect(response).to.be.a('object');
    });
    it('should return an object with the id of the new product', async () => {
      const response = await productModel.addProduct({ name: 'Cellphone' });
      expect(response).to.be.deep.equal({ id: 4 });
    });
  });
  describe('The function updateProduct', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').resolves();
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return a boolean', async () => {
      const response = await productModel.updateProduct({ id: 1, name: 'Martelo' });
      expect(response).to.be.a('boolean');
    });
    it('should return true', async () => {
      const response = await productModel.updateProduct({ id: 1, name: 'Cellphone' });
      expect(response).to.be.equal(true);
    });
  });
});
