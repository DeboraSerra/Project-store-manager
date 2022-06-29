const productService = require('../services/productService');

const validateFields = (prods) => {
  const validId = prods.every(({ productId }) => productId);
  const hasQuant = prods.every(({ quantity }) => quantity || quantity === 0);
  const validQuant = prods.every(({ quantity }) => quantity > 0);
  if (!validId) return { code: 400, message: '"productId" is required' };
  if (!hasQuant) return { code: 400, message: '"quantity" is required' };
  if (!validQuant) return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  return {};
};

const validateProd = async (prods) => {
  const { products } = await productService.getAll();
  const exists = prods.filter(({ productId }) => products
    .find(({ id }) => id === productId));
  if (exists.length === 0 || exists.length !== prods.length) return false;
  return true;
};

const validateId = async (req, res, next) => {
  const { body } = req;
  const { code, message } = validateFields(body);
  if (message) return res.status(code).json({ message });
  const areValid = await validateProd(body);
  if (!areValid) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = validateId;
