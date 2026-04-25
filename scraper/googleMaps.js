// Funções puras utilitárias para o Puppeteer
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            const timer = setInterval(() => {
                const scrollableSection = document.querySelector('div[role="feed"]');
                if (scrollableSection) {
                    scrollableSection.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollableSection.scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }
            }, 100);
        });
    });
}

module.exports = { autoScroll };