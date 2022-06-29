const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');

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
});
