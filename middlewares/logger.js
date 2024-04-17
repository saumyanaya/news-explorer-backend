const { createLogger, transports, format } = require('winston');
const fs = require('fs');

const logDir = 'logs';

// Create log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create logger for API requests
const requestLogger = createLogger({
  transports: [
    new transports.File({
      filename: `${logDir}/request.log`,
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

// Create logger for errors
const errorLogger = createLogger({
  transports: [
    new transports.File({
      filename: `${logDir}/error.log`,
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
