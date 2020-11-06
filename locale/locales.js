const fs = require('fs');
require('dotenv').config();

let locales = [];
const localeFiles = fs.readdirSync('./locale').filter(file => file.endsWith('.json'));

localeFiles.forEach(file => {
    const locale = require(`./${file}`);
    locales[locale.code] = locale.translations;
})

const _U = (locale, key) => {
    if(!locale) locale = 'en';
    locale = locale.toLowerCase();

    if(!locales[locale][key]) return `${key} was not found`;

    return locales[locale][key];
}

const getLocaleData = (locale) => {
    return locales[locale];
}

module.exports._U = _U
module.exports.getLocaleData = getLocaleData