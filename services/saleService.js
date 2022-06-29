const saleModel = require('../models/saleModel');

let idSale;

const addProd = ({ productId, quantity }) => {
  saleModel.soldProds({ saleId: idSale, productId, quantity });
  return { productId, quantity };
};

const saleService = {
  addSale: async (prods) => {
    idSale = await saleModel.addSale();
    const itemsSold = prods.map(addProd);
    return { code: 201, sold: { id: idSale, itemsSold } };
  },
  getAll: async () => {
    const result = await saleModel.getAll();
    const sales = result.map(({ date, product_id: productId, sale_id: saleId, quantity }) => ({
      date,
      saleId,
      productId,
      quantity,
    }));
    return { code: 200, sales };
  },
  findById: async (id) => {
    const result = await saleModel.findById(id);
    if (result.length === 0) return { code: 404, message: 'Sale not found' };
    const sale = result.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }));
    return { code: 200, sale };
  },
};

module.exports = saleService;
