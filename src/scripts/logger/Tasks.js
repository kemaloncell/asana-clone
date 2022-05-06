const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'task-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/tasks/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/tasks/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/tasks/combines.log', level: 'info' }),
        //new winston.transports.Console() her işlemi consola yazdırmak için
    ],
});

module.exports = logger;