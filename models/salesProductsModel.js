const connection = require('./connection');

const create = async (data) => {
  const { salesId, productId, quantity } = data;
  const query = `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
  VALUE(?, ?, ?)`;
  await connection.execute(query, [salesId, productId, quantity]);
};

const update = async (id, data) => {
  console.log(data);
  const { productId, quantity } = data;
  const query = `UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ? WHERE sale_id = ?`;
  await connection.execute(query, [productId, quantity, id]);
  console.log(id);
};

module.exports = {
  create,
  update,
};