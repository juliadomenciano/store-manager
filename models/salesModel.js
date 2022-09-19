const connection = require('./connection');

const formatResult = (data) => data.map((item) => ({
    saleId: item.sale_id,
    date: item.date,
    quantity: item.quantity,
    productId: item.product_id,
}));
  
const formatResultById = (data) => data.map((item) => ({
    date: item.date,
    quantity: item.quantity,
    productId: item.product_id,
  }));

const getAll = async () => {
  const query = `SELECT p.sale_id, s.date, p.quantity,
  p.product_id FROM StoreManager.sales_products AS p
  INNER JOIN StoreManager.sales AS s
  ON p.sale_id = s.id
  ORDER BY p.sale_id, p.product_id;`;
  const [result] = await connection.execute(query);
  const formatedResult = formatResult(result);
  return formatedResult;
};

const findById = async (data) => {
  const query = `SELECT p.sale_id, s.date, p.quantity,
  p.product_id FROM StoreManager.sales_products AS p
  INNER JOIN StoreManager.sales AS s
  ON p.sale_id = s.id
  WHERE s.id = ?
  ORDER BY p.sale_id, p.product_id;`;
  const [result] = await connection.execute(query, [data]);
  const formatedResult = formatResultById(result);
  return formatedResult;
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