const sinon = require('sinon');
const { expect } = require('chai');
const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');
const { mockSalesAfter, mockSaleAfter } = require('../mocks/mockSales');

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
  describe('The function getAll', () => {
    const response = {};
    const request = {};
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, 'getAll')
        .resolves({ code: 200, sales: mockSalesAfter })
    });
    afterEach(() => {
      sinon.restore();
    });
    it('returns code 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    });
    it('returns an array of sales', async () => {
      await saleController.getAll(request, response);
      expect(response.json.calledWith(mockSalesAfter)).to.be.true;
    });
  });
  describe('The function findById', () => {
    describe('with a valid id', () => {
      const response = {};
      const request = {};
      beforeEach(() => {
        request.params = {
          id: 1,
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(saleService, 'findById')
          .resolves({ code: 200, sale: mockSaleAfter })
      });
      afterEach(() => {
        sinon.restore();
      });
      it('With the right information, returns code 200', async () => {
        await saleController.findById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
      });
      it('returns an array of right sale', async () => {
        await saleController.findById(request, response);
        expect(response.json.calledWith(mockSaleAfter)).to.be.true;
      });
    });
    describe('with an invalid id', () => {
      const response = {};
      const request = {};
      beforeEach(() => {
        request.params = {
          id: 99,
        }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(saleService, 'findById')
          .resolves({ code: 404, message: 'Sale not found' })
      });
      afterEach(() => {
        sinon.restore();
      });
      it('With the right information, returns code 404', async () => {
        await saleController.findById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
      });
      it('returns a message', async () => {
        await saleController.findById(request, response);
        expect(response.json.calledWith({ message: 'Sale not found' }))
          .to.be.true;
      });
    });
  });
});
