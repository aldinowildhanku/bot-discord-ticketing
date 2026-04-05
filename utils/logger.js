const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

function writeLog(file, message) {
    const time = new Date().toISOString();
    const log = `[${time}] ${message}\n`;

    fs.appendFileSync(path.join(logDir, file), log);
}

module.exports = {

    info(msg) {
        console.log(`INFO: ${msg}`);
        writeLog('info.log', msg);
    },

    error(msg) {
        console.error(`ERROR: ${msg}`);
        writeLog('error.log', msg);
    },

    warn(msg) {
        console.warn(`WARN: ${msg}`);
        writeLog('warn.log', msg);
    }
};