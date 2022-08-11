const productService = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const { code, products } = await productService.getAll();
    res.status(code).json(products);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const { code, message, product } = await productService.findById(id);
    if (message) return res.status(code).json({ message });
    res.status(code).json(product);
  },
  addProduct: async (req, res) => {
    const { name } = req.body;
    const { code, message, product } = await productService.addProduct({ name });
    if (message) return res.status(code).json({ message });
    res.status(code).json(product);
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { code, message } = await productService.updateProduct({ id, name });
    if (message) return res.status(code).json({ message });
    res.status(code).json({ id, name });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const { code, message } = await productService.delete(id);
    if (message) return res.status(code).json({ message });
    res.status(code).end();
  },
  query: async (req, res) => {
    const { q } = req.query;
    const { code, products } = await productService.query(q);
    res.status(code).json(products);
  },
};

module.exports = productController;
