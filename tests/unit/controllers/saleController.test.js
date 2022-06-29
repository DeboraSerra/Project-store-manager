const sinon = require('sinon');
const { expect } = require('chai');
const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');

describe('Test the sales\' controller layer', () => {
  describe('The function addSale', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, 'addSale')
        .resolves({ code: 201, sold: { id: 3, itemsSold: [{ productId: 2, quantity: 3 }] } })
    });
    afterEach(() => {
      sinon.restore();
    });
    it('With the right information, returns code 201', async () => {
      request.body = [{ productId: 2, quantity: 3 }];
      await saleController.addSale(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    });
  });
});
