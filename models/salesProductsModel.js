const connection = require('./connection');

const findById = async (data) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=? ORDER BY id';
  const [result] = await connection.execute(query, [data]);
  return result;
};

const create = async (data) => {
  const { salesId, productId, quantity } = data;
  const query = `INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) 
  VALUE(?, ?, ?)`;
  await connection.execute(query, [salesId, productId, quantity]);
};

const update = async (data) => {
  const { id, productId, quantity } = data;
  const query = 'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE id = ?';
  const [result] = await connection.execute(query, [productId, quantity, id]);
  return result;
};

module.exports = {
  findById,
  create,
  update,
};