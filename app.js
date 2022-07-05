const express = require('express');
require('express-async-errors');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const error = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products/search', productController.searchTerm);
app.get('/products/:id', productController.findById);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);
app.get('/products', productController.getAll);
app.post('/products', productController.create);
app.post('/sales', salesController.create);
app.get('/sales/:id', salesController.findById);
app.delete('/sales/:id', salesController.remove);
// app.put('/sales/:id', salesController.update);
app.get('/sales', salesController.getAll);

app.use(error);

// app.use((err, _req, res, _next) => {
 
//   return res.status(500).json({ message: err.message });
// });

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;