class BadRequestError extends Error {
  constructor(message) {
    super(message || "Bad Request");
    this.statusCode = 400;
  }
}
module.exports = {
  BadRequestError,
};
