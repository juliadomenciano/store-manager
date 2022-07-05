const connection = require('./connection');
// const sales_productsModel = require('./salesProductsModel');

const getAll = async () => {
  const query = `SELECT p.sale_id, s.date, p.quantity,
  p.product_id FROM StoreManager.sales_products AS p
  INNER JOIN StoreManager.sales AS s
  ON p.sale_id = s.id
  ORDER BY p.sale_id, p.product_id;`;
  const [result] = await connection.execute(query);
  return result;
};

const findById = async (data) => {
  const query = `SELECT p.sale_id, s.date, p.quantity,
  p.product_id FROM StoreManager.sales_products AS p
  INNER JOIN StoreManager.sales AS s
  ON p.sale_id = s.id
  WHERE s.id = ?
  ORDER BY p.sale_id, p.product_id;`;
  const [result] = await connection.execute(query, [data]);
  return result;
};

const create = async (data) => {
  const query = 'INSERT INTO StoreManager.sales (id) VALUE (?)';
  await connection.execute(query, [data]);
};

const remove = async (data) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [data]);
};

const list = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [result] = await connection.execute(query);
  return result;
};

module.exports = {
  getAll,
  create,
  findById,
  remove,
  list,
};