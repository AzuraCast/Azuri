import fs from 'fs';

export function unixConvert (time, timezone) {
    if(!timezone) timezone = 'UTC';
    var convertedTime = new Date(time*1000).toLocaleString('en-US', { timeZone: timezone });
    convertedTime = new Date(convertedTime);
    return `${this.padTime(convertedTime.getHours())}:${this.padTime(convertedTime.getMinutes())}`;
};

export function padTime (time) {
    var t = '' + time;
    while (t.length < 2) {
        t = '0' + t;
    }

    return t;
};

export function logError (time, content) {
    if (process.env.LOG_PATH) {
        fs.appendFile(`${process.env.LOG_PATH}`, `\n\n===============================================\n${time.toString()}\n${content}`, (err) => {
            if(err) console.log(err);
        })
    }
    
    console.error(content);
};