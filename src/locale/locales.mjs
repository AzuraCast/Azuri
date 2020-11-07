import fs from 'fs';

let locales = [];
const localeFiles = fs.readdirSync('./locale').filter(file => file.endsWith('.json'));

localeFiles.forEach(file => {
    const locale = JSON.parse(fs.readFileSync(`./locale/${file}`));
    locales[locale.code] = locale.translations;
});

export function _U (locale, key) {
    if(!locale) locale = 'en';
    locale = locale.toLowerCase();

    if(!locales[locale][key]) return `${key} was not found`;

    return locales[locale][key];
};

export function getLocaleData (locale) {
    return locales[locale];
};