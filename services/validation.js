const runSchema = (schema) => async (data) => {
  const { error } = await schema.validateAsync(data);
  if (error) {
    error.message = error.details[0].message;
    throw error;
  }
  return 'value';
};

module.exports = { runSchema };