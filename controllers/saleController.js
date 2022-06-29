const saleService = require('../services/saleService');

const saleController = {
  addSale: async (req, res) => {
    const { body } = req;
    const { code, message, sold } = await saleService.addSale(body);
    if (message) return res.status(code).json({ message });
    res.status(code).json(sold);
  },
};

module.exports = saleController;
