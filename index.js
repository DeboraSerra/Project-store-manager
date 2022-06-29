const rescue = require('express-rescue');
const app = require('./app');
require('dotenv').config();
const productController = require('./controllers/productController');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.get('/products', rescue(productController.getAll));

app.get('/products/:id', rescue(productController.findById));

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
})
