const sinon = require('sinon');
const { expect } = require('chai');
const conn = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');
const mockSale = require('../mocks/mockSale');

describe('Tests the sales\' model layer', () => {
  describe('The function addSale', () => {
    beforeEach(() => {
      const query1 = 'INSERT INTO StoreManager.sales';
      const query2 = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
        VALUES (?, ?, ?)`;
      sinon.stub(conn, 'execute')
        .withArgs(query1).returns([{ insertId: 3 }]);
    })
  })
})
