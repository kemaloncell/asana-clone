const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'project-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/projects/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/projects/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/projects/combines.log', level: 'info' }),
        //new winston.transports.Console() her işlemi consola yazdırmak için
    ],
});

module.exports = logger;