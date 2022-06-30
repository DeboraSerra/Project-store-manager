const productModel = require('../models/productModel');

const productService = {
  getAll: async () => {
    const products = await productModel.getAll();
    const sorted = products.sort((a, b) => a.id - b.id);
    return { code: 200, products: sorted };
  },
  findById: async (id) => {
    const product = await productModel.findById(id);
    if (product.length === 0) return { code: 404, message: 'Product not found' };
    return { code: 200, product: product[0] };
  },
  addProduct: async ({ name }) => {
    if (!name) return { code: 400, message: '"name" is required' };
    if (name.length < 5) {
      return { code: 422,
        message: '"name" length must be at least 5 characters long' };
    }
    const { id } = await productModel.addProduct({ name });
    return { code: 201, product: { id, name } };
  },
  updateProduct: async ({ id, name }) => {
    if (!name) return { code: 400, message: '"name" is required' };
    if (name.length < 5) {
      return { code: 422,
        message: '"name" length must be at least 5 characters long' };
    }
    const exists = await productModel.findById(id);
    if (exists.length === 0) return { code: 404, message: 'Product not found' };
    await productModel.updateProduct({ id, name });
    return { code: 200, id, name };
  },
  delete: async (id) => {
    const exists = await productModel.findById(id);
    if (exists.length === 0) return { code: 404, message: 'Product not found' };
    await productModel.delete(id);
    return { code: 204 };
  },
  query: async (q) => {
    const products = await productModel.query(q);
    return { code: 200, products };
  },
};

module.exports = productService;
