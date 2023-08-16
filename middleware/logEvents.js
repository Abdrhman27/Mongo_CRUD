const { format } = require("date-fns");
const { v4 } = require("uuid");

const fs = require("fs")
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:ss:mm");
    const logItem = `${dateTime}\t${v4()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) await fsPromises.mkdir("logs");
        await fsPromises.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
    } catch (err) {
        console.log(err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logEvents, logger }; 