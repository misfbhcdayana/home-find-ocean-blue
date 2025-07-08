const puppeteer = require('puppeteer');

async function scrapeApartmentsCom(location) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = `https://www.apartments.com/${encodeURIComponent(location)}/`;
  await page.goto(searchUrl, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);
  const rentals = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.placardContainer .placard'));
    return cards.slice(0, 10).map(card => ({
      title: card.querySelector('.property-title')?.textContent?.trim() || '',
      price: card.querySelector('.property-pricing')?.textContent?.trim() || '',
      address: card.querySelector('.property-address')?.textContent?.trim() || '',
      url: card.querySelector('a.property-link')?.href || '',
      image: card.querySelector('img')?.src || '',
    }));
  });
  await browser.close();
  return rentals;
}

module.exports = scrapeApartmentsCom; 