const axios = require('axios');

async function checkSiteIntegrity(url) {
    if (!url) return false;
    try {
        // Axios config com timeout curto e ignorando SSL quebrado (comum em sites locais ruins)
        const response = await axios.get(url, { timeout: 5000, httpsAgent: new require('https').Agent({ rejectUnauthorized: false }) });
        return response.status === 200;
    } catch (error) {
        return false; // URL quebrada ou timeout = Lead Quente
    }
}

module.exports = { checkSiteIntegrity };