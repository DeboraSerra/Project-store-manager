const saleModel = require('../models/saleModel');

let saleId;

const addProd = ({ productId, quantity }) => {
  saleModel.soldProds({ saleId, productId, quantity });
  return { productId, quantity };
};

const saleService = {
  addSale: async (prods) => {
    saleId = await saleModel.addSale();
    const itemsSold = prods.map(addProd);
    return { code: 201, sold: { id: saleId, itemsSold } };
  },
};

module.exports = saleService;
