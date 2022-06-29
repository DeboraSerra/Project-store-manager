const productService = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const { code, message, products } = await productService.getAll();
    if (message) return res.status(code).json({ message });
    res.status(code).json(products);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const { code, message, product } = await productService.findById(id);
    if (message) return res.status(code).json({ message});
    res.status(code).json(product);
  }
}

module.exports = productController;
