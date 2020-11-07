import fs from 'fs';

export default class {
    unixConvert (time, timezone) {
        if(!timezone) timezone = 'UTC';
        var convertedTime = new Date(time*1000).toLocaleString('en-US', { timeZone: timezone });
        convertedTime = new Date(convertedTime);
        return `${this.padTime(convertedTime.getHours())}:${this.padTime(convertedTime.getMinutes())}`;
    };

    padTime (time) {
        var t = '' + time;
        while (t.length < 2) {
            t = '0' + t;
        }
    
        return t;
    };

    logError (time, content) {
        if (process.env.LOG_PATH) {
            fs.appendFile(`${process.env.LOG_PATH}`, `\n\n===============================================\n${time.toString()}\n${content}`, (err) => {
                if(err) console.log(err);
            })
        }
        
        console.error(content);
    };
};
