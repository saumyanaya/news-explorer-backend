// logger.js
const winston = require('winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: 'request.log',
      format: winston.format.json(),
    }),
  ],
});

module.exports = logger;
