const { Router } = require('express');
const rescue = require('express-rescue');
const saleController = require('../controllers/saleController');
const validateId = require('../middlewares/validateProdId');

const route = Router();

route.route('/')
  .get(rescue(saleController.getAll))
  .post(rescue(validateId), rescue(saleController.addSale));

route.route('/:id')
  .get(rescue(saleController.findById))
  .put(rescue(validateId), rescue(saleController.updateSale))
  .delete(rescue(saleController.delete));

module.exports = route;
