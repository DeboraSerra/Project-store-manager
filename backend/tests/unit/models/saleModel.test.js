const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');
const { mockSalesBefore } = require('../mocks/mockSales');

describe('Tests the sales\' model layer', () => {
  describe('The function addSale', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').returns([{ insertId: 3 }]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return the id of the added sale', async () => {
      const response = await saleModel.addSale();
      expect(response).to.be.equal(3);
    });
  });
  describe('The soldProds function', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return the info about the added product', async () => {
      const response = await saleModel
        .soldProds({ saleId: 1, productId: 2, quantity: 1 });
      expect(response).to.be.deep.equal({ productId: 2, quantity: 1 });
    });
  });
  describe('The function getAll', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').returns([mockSalesBefore]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const response = await saleModel.getAll();
      expect(response).to.be.a('array');
    });
    it('should return an array of sales', async () => {
      const response = await saleModel.getAll();
      expect(response).to.be.deep.equal(mockSalesBefore);
    });
  });
  describe('The function findById', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').returns([[mockSalesBefore[0]]]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an array', async () => {
      const response = await saleModel.findById();
      expect(response).to.be.a('array');
    });
    it('should return an array of sales', async () => {
      const response = await saleModel.findById();
      expect(response[0]).to.be.deep.equal(mockSalesBefore[0]);
    });
  });
  describe('The function delete', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').resolves();
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return a boolean', async () => {
      const response = await saleModel.delete(1);
      expect(response).to.be.a('boolean');
    });
    it('should return true', async () => {
      const response = await saleModel.delete(1);
      expect(response).to.be.equal(true);
    });
  });
  describe('The function updateSale', () => {
    beforeEach(() => {
      sinon.stub(conn, 'execute').resolves();
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns an object', async () => {
      const response = await saleModel
        .updateSale({ id: 1, productId: 1, quantity: 1 });
      expect(response).to.be.a('object');
    });
    it('the object must have the productId and the quantity', async () => {
      const response = await saleModel
        .updateSale({ id: 1, productId: 1, quantity: 1 });
      expect(response).to.be.deep.equal({ productId: 1, quantity: 1 });
    });
  });
});
