const saleService = require('../services/saleService');

const saleController = {
  addSale: async (req, res) => {
    const { body } = req;
    const { code, sold } = await saleService.addSale(body);
    res.status(code).json(sold);
  },
  getAll: async (_req, res) => {
    const { code, sales } = await saleService.getAll();
    res.status(code).json(sales);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const { code, message, sale } = await saleService.findById(id);
    if (message) return res.status(code).json({ message });
    res.status(code).json(sale);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const { code, message } = await saleService.delete(id);
    if (message) return res.status(code).json({ message });
    res.status(code).end();
  },
  updateSale: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { code, update, message } = await saleService.updateSale(id, body);
    if (message) return res.status(code).json({ message });
    res.status(code).json(update);
  },
};

module.exports = saleController;
