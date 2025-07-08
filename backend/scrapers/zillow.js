const puppeteer = require('puppeteer');

async function scrapeZillow(location) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = `https://www.zillow.com/homes/for_rent/${encodeURIComponent(location)}/`;
  await page.goto(searchUrl, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);
  const rentals = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('article.list-card'));
    return cards.slice(0, 10).map(card => ({
      title: card.querySelector('.list-card-type')?.textContent?.trim() || '',
      price: card.querySelector('.list-card-price')?.textContent?.trim() || '',
      address: card.querySelector('.list-card-addr')?.textContent?.trim() || '',
      url: card.querySelector('a.list-card-link')?.href || '',
      image: card.querySelector('img.list-card-img')?.src || '',
    }));
  });
  await browser.close();
  return rentals;
}

module.exports = scrapeZillow; 