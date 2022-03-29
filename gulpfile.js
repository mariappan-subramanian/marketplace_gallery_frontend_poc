/* eslint-disable no-console */
const gulp = require('gulp');
const dotenv = require('dotenv');

const generateAllLocaleStringsJSON = require('./scripts/generate-strings');

const getEnvFilePath = () => (process.env.MODE ? `.env.${process.env.MODE}` : '.env.development');
dotenv.config({ path: getEnvFilePath() });

async function generate() {
  await generateAllLocaleStringsJSON();
}

const buildJSON = gulp.series(generate);

exports.generateStrings = generateAllLocaleStringsJSON;
exports.build = buildJSON;
exports.default = buildJSON;
