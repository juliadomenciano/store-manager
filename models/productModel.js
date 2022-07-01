const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const findById = async (data) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=? ORDER BY id';
  const [result] = await connection.execute(query, [data]);
  return result;
};

const create = async (data) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const query2 = 'SELECT * FROM StoreManager.products WHERE name=?';
  await connection.execute(query, [data]);
  const [result] = await connection.execute(query2, [data]);
  return result;
};

const update = async (data) => {
  const { id, name } = data;
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  return result;
};

const remove = async (data) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [data]);
};

const searchTerm = async (data) => {
  const formatData = `%${data}%`;
  const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
  const [result] = await connection.execute(query, [formatData]);
  return result;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
  searchTerm,
  
};