const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoute = require('./routes/products.route');
const saleRoute = require('./routes/sales.route');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);

app.use('/sales', saleRoute);

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
