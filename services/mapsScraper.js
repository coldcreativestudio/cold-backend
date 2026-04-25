const puppeteer = require('puppeteer');
const Lead = require('../models/leadModel');
const { checkSiteIntegrity } = require('./siteChecker');

async function runScrapingPipeline(nicho, cidade) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const query = `${nicho} em ${cidade}`;
    
    try {
        await page.goto(`https://www.google.com/maps/search/$${encodeURIComponent(query)}`);
        await page.waitForSelector('div[role="feed"]', { timeout: 10000 });
        
        // Simulação de extração (reduzida para brevidade do boilerplate)
        const leadsRaw = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('div[role="article"]')).slice(0, 10).map(item => ({
                nome: item.querySelector('div.fontHeadlineSmall')?.innerText || 'Sem Nome',
                temSiteOriginal: !!item.querySelector('a[href^="http"]:not([href*="google"])')
            }));
        });

        for (const lead of leadsRaw) {
            const exists = await Lead.findOne({ nome: lead.nome });
            if (!exists) {
                const isRealSite = lead.temSiteOriginal ? await checkSiteIntegrity('mock-url') : false;
                await Lead.create({
                    nome: lead.nome,
                    nicho: nicho,
                    temSite: isRealSite
                });
            }
        }
    } finally {
        await browser.close();
    }
}

module.exports = { runScrapingPipeline };