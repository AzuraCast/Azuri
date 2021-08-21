import fs from "fs";

let locales = [];
const localeFiles = fs
  .readdirSync("./locale")
  .filter((file) => file.endsWith(".json"));
localeFiles.forEach((fileName) => {
  let locale = getLocaleFile(fileName);
  locales[locale.code] = locale.translations;
});

export function _U(locale, key) {
  if (!locale) locale = "en";
  locale = locale.toLowerCase();

  if (!locales[locale][key]) return `${key} was not found`;

  return locales[locale][key];
}

export function getLocaleData(locale) {
  return locales[locale];
}

export function getAvailableLocales() {
  let availableLocales = [];
  localeFiles.forEach((fileName) => {
    let localeData = getLocaleFile(fileName);
    availableLocales.push(`${localeData.name} (${localeData.code})`);
  });

  return availableLocales;
}

export function isValidLocale(code) {
  let found = false;

  localeFiles.forEach((fileName) => {
    let locale = getLocaleFile(fileName);

    if (locale.code === code) {
      found = true;
    }
  });

  return found;
}

function getLocaleFile(file) {
  let locale = JSON.parse(fs.readFileSync(`./locale/${file}`));
  return locale;
}
