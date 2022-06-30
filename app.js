const express = require('express');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productController.getAll);
app.get('/products/:id', productController.findById);
app.post('/products', productController.create);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.findById);
app.post('/sales', salesController.create);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.remove);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;