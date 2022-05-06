const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'section-service' },
    transports: [
        new winston.transports.File({ filename: 'src/logs/sections/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'src/logs/sections/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'src/logs/sections/combines.log', level: 'info' }),
        //new winston.transports.Console() her işlemi consola yazdırmak için
    ],
});

module.exports = logger;