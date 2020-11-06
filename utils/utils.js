const fs = require('fs');
require('dotenv').config();
const env = process.env;
const package = require('../package.json');
const github = require('octonode');

getPackageName = () => {
    let repo = package.repository.url;
    repo = repo.split('/');
    repo = repo[repo.length - 2] + '/' + repo[repo.length - 1].split('.git')[0];
    return repo;
}

const gclient = github.client();
const ghrepo = gclient.repo(getPackageName())

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

module.exports.checkForUpdate = () => {
    ghrepo.releases(function(_, data) {
        let gitVersion = data[0].tag_name;
        let gitUrl = data[0].html_url;
        let localVersion = package.version;

        if(localVersion < gitVersion) {
            console.log(`[ UPDATE ] There's a new version available! ${gitVersion} - ${gitUrl}`)
        }
    })
}