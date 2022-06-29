const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');
const { mockSalesBefore, mockSalesAfter,
  mockSaleAfter, mockSaleBefore } = require('../mocks/mockSales');

describe('Tests the sales\' service layer', () => {
  describe('The function addSale', () => {
    beforeEach(() => {
      sinon.stub(saleModel, 'addSale').returns({ saleId: 3 });
      sinon.stub(saleModel, 'soldProds').returns({ productId: 2, quantity: 2 });
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an object', async () => {
      const response = await saleService.addSale([ { productId: 2, quantity: 2 }]);
      expect(response).to.be.a('object');
    });
    it('should return the code 201', async () => {
      const response = await saleService.addSale([ { productId: 2, quantity: 2 }]);
      expect(response.code).to.be.equal(201);
    });
    it('should have a key sold which value is an object', async () => {
      const response = await saleService.addSale([ { productId: 2, quantity: 2 }]);
      expect(response.sold).to.be.a('object');
    });
    it('should return the id of the sale and the items sold', async () => {
      const response = await saleService.addSale([ { productId: 2, quantity: 2 }]);
      expect(response.sold).to.be.deep
        .equal({ id: { saleId: 3 }, itemsSold: [{ productId: 2, quantity: 2 }]});
    });
  });
  describe('The function getAll', () => {
    beforeEach(() => {
      sinon.stub(saleModel, 'getAll').resolves(mockSalesBefore);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should return an object', async () => {
      const response = await saleService.getAll();
      expect(response).to.be.a('object');
    });
    it('should return an object with the code 200', async () => {
      const response = await saleService.getAll();
      expect(response.code).to.be.equal(200);
    });
    it('should return an object with an array of sales', async () => {
      const response = await saleService.getAll();
      expect(response.sales).to.be.deep.equal(mockSalesAfter);
    });
  });
  describe('The function findById', () => {
    describe('If the id exists', () => {
      beforeEach(() => {
        sinon.stub(saleModel, 'findById').resolves(mockSaleBefore);
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return an object', async () => {
        const response = await saleService.findById(1);
        expect(response).to.be.a('object');
      });
      it('should return an object with the code 200', async () => {
        const response = await saleService.findById(1);
        expect(response.code).to.be.equal(200);
      });
      it('should return an object with an array of sales', async () => {
        const response = await saleService.findById(1);
        expect(response.sale).to.be.deep.equal(mockSaleAfter);
      });
    });
    describe('If the id doesn\'t exist', () => {
      beforeEach(() => {
        sinon.stub(saleModel, 'findById').resolves([]);
      });
      afterEach(() => {
        sinon.restore();
      });
      it('should return an object', async () => {
        const response = await saleService.findById(1);
        expect(response).to.be.a('object');
      });
      it('should return an object with the code 404', async () => {
        const response = await saleService.findById(1);
        expect(response.code).to.be.equal(404);
      });
      it('should return an object with an array of sales', async () => {
        const response = await saleService.findById(1);
        expect(response.message).to.be.equal('Sale not found');
      });
    });
  });
});
