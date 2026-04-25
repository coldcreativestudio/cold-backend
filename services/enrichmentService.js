// Simula busca por redes sociais e formatação de WhatsApp
function formatWhatsapp(phoneStr) {
    if (!phoneStr) return null;
    const digits = phoneStr.replace(/\D/g, '');
    if (digits.length >= 10) return `55${digits}`;
    return null;
}

async function enrichLeadData(leadObj) {
    // Aqui entraria API do Instagram/Facebook para buscar fotos
    leadObj.whatsapp = formatWhatsapp(leadObj.telefone);
    leadObj.temInstagram = false; // Mock
    return leadObj;
}

module.exports = { enrichLeadData, formatWhatsapp };