const { Router } = require('express');
const rescue = require('express-rescue');
const productController = require('../controllers/productController');

const route = Router();

route.route('/')
  .get(rescue(productController.getAll))
  .post(rescue(productController.addProduct));

route.route('/search')
  .get(rescue(productController.query));

route.route('/:id')
  .get(rescue(productController.findById))
  .put(rescue(productController.updateProduct))
  .delete(rescue(productController.delete));

module.exports = route;
