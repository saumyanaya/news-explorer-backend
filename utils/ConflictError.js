class ConflictError extends Error {
  constructor(message) {
    super(message || "Conflict");
    this.statusCode = 409;
  }
}
module.exports = {
  ConflictError,
};
