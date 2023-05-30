const { PORT = 3000, MONGODB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  PORT,
  MONGODB_ADDRESS,
};
