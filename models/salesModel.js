const connection = require('./connection');

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

module.exports = {
  getAll,
  create,
  findById,
};