const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

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
});
