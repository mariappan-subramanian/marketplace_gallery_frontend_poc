/* eslint-disable import/no-extraneous-dependencies */

const csvToJson = require('csvtojson')();
const fse = require('fs-extra');
const rtlDetect = require('rtl-detect');
const consola = require('consola');
const cliProgress = require('cli-progress');

const stringsCSVPath = `${process.cwd()}/src/common/data/marketplace-string.csv`;
const OUTPUT_FOLDER = 'src/common/locales';

const progressBar = new cliProgress.SingleBar({
  format: 'progress [{bar}] {percentage}% | ETA: {eta}s',
}, cliProgress.Presets.legacy);

async function clearAndCreateFolder() {
  await fse.remove(OUTPUT_FOLDER);
  await fse.ensureDir(OUTPUT_FOLDER);
}

/**
 * Returns array of all locales from the csv file
 */
function getAllLocales(csvValues) {
  const escapeKeys = ['key', 'messages', 'texts'];
  return Object.keys(csvValues)
    .filter(csvKey => !escapeKeys.includes(csvKey));
}

/**
 * Returns stringified json for individual locale
 */
function generateLocaleStringsJson(allCsvValues, locale) {
  const localesJson = {
    messages: {},
    texts: {},
  };
  allCsvValues.forEach((csvValue) => {
    const stringType = csvValue.texts === 'true' ? 'texts' : 'messages';
    const stringKey = csvValue.key;
    if (csvValue[locale].length) {
      localesJson[stringType][stringKey] = csvValue[locale];
    }
  });

  return JSON.stringify(localesJson);
}

/**
 * Loops through locales array and generates json
 * files as `{locale}`.json in src/common/locales
 */
async function generateAllLocaleStringsJSON() {
  consola.info('Starting `generateAllLocaleStringsJSON`');
  await clearAndCreateFolder();
  const allCsvValues = await csvToJson.fromFile(stringsCSVPath);

  const allLocales = getAllLocales(allCsvValues[0]);

  progressBar.start(allLocales.length, 0);
  allLocales.forEach((locale, index) => {
    // Marketplace doesnt support RTL lang right now
    if (!rtlDetect.isRtlLang(locale)) {
      const localeStringsJson = generateLocaleStringsJson(allCsvValues, locale);
      fse.writeFileSync(`${OUTPUT_FOLDER}/${locale}.json`, localeStringsJson);
    }
    progressBar.update(index + 1);
  });
  progressBar.stop();
  consola.success('Completed `generateAllLocaleStringsJSON`');
}

module.exports = generateAllLocaleStringsJSON;
