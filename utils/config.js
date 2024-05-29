const {
  JWT_SECRET = "dev-secret",
  NODE_ENV = "production",
  CONNECTION,
} = process.env;

const { MONGO_DB_CONNECTION = "mongodb://127.0.0.1:27017/mydatabase" } =
  process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  CONNECTION,
  MONGO_DB_CONNECTION,
};
