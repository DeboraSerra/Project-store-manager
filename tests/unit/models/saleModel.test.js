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
  })
})
