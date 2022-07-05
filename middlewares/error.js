module.exports = (err, req, res, _next) => {
   const { name, message } = err;

  if (err.message.includes('greater')) {
 return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
}
  if (err.message.includes('required')) return res.status(400).json({ message: err.message });

    if (name) return res.status(404).json({ message });
  // next();
};