const fs = require('fs');
require('dotenv').config();
const env = process.env;

module.exports.unixConvert = (time, timezone) => {
    if(!timezone) timezone = 'UTC';
    var convertedTime = new Date(time*1000).toLocaleString('en-US', { timeZone: timezone });
    convertedTime = new Date(convertedTime);
    return `${this.padTime(convertedTime.getHours())}:${this.padTime(convertedTime.getMinutes())}`;
}

module.exports.padTime = (time) => {
    var t = '' + time;
    while (t.length < 2) {
        t = '0' + t;
    }

    return t;
}

module.exports.logError = (time, content) => {
    fs.appendFile(`${env.LOG_DIR}`, `\n\n===============================================\n${time.toString()}\n${content}`, (err) => {
        if(err) console.log(err);
    })
    console.log("New Log Created - " + env.LOG_DIR + time + ".txt")
}