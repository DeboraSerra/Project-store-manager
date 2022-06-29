const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

const validateFields = (prods) => {
  const validId = prods.every(({ productId }) => productId);
  const hasQuant = prods.every(({ quantity }) => quantity || quantity === 0);
  const validQuant = prods.every(({ quantity }) => quantity > 0);
  if (!validId) return { code: 400, message: '"productId" is required' };
  if (!hasQuant) return { code: 400, message: '"quantity" is required' };
  if (!validQuant) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  return {};
}

const validateProd = async (id) => {
  const exists = await productModel.findById(id);
  if (exists.length === 0) return false;
  return true;
}

const saleService = {
  addSale: async (prods) => {
    const { code, message } = validateFields(prods);
    if (message) return { code, message };
    const found = [];
    for(const prod of prods) {
      const result = await validateProd(prod.productId);
      found.push(result);
    }
    const exist = found.every((item) => item);
    if (!exist) return { code: 404, message: 'Product not found' };
    const saleId = await saleModel.addSale();
    const itemsSold = []
    for (const { productId, quantity } of prods) {
      const result = await saleModel.soldProds({ saleId, productId, quantity });
      itemsSold.push(result);
    }
    return { code: 201, sold: { id: saleId, itemsSold } };
  }
}

module.exports = saleService;
