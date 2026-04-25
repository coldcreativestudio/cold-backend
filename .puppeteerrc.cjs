const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Diz ao Puppeteer para salvar o Chrome nesta pasta específica
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};