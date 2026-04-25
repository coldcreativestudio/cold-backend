const cron = require('node-cron');
const { runScrapingPipeline } = require('./mapsScraper');
const { nichos, cidades } = require('../scraper/constants');

function startCronJobs() {
    // Roda todo dia às 06:00
    cron.schedule('0 6 * * *', async () => {
        console.log('⏰ Iniciando Job Diário de Scraping...');
        // Exemplo: Pegar primeiro nicho e cidade
        const nichoDiario = Object.keys(nichos)[0];
        const cidadeDiaria = cidades[0];
        
        await runScrapingPipeline(nichoDiario, cidadeDiaria);
    });
}

module.exports = { startCronJobs };