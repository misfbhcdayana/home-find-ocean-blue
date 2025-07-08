const scrapeApartmentsCom = require('./apartmentsCom');
const scrapeZillow = require('./zillow');

// Stubs for other sites
async function stubScraper(site) {
  return [];
}

const siteScrapers = [
  { name: 'Apartments.com', fn: scrapeApartmentsCom },
  { name: 'Zillow', fn: scrapeZillow },
  { name: 'Trulia', fn: (loc) => stubScraper('Trulia') },
  { name: 'Rent.com', fn: (loc) => stubScraper('Rent.com') },
  { name: 'Realtor.com', fn: (loc) => stubScraper('Realtor.com') },
  { name: 'HotPads', fn: (loc) => stubScraper('HotPads') },
  { name: 'Apartment Finder', fn: (loc) => stubScraper('Apartment Finder') },
  { name: 'Apartment List', fn: (loc) => stubScraper('Apartment List') },
  { name: 'Zumper', fn: (loc) => stubScraper('Zumper') },
  { name: 'Craigslist', fn: (loc) => stubScraper('Craigslist') },
  { name: 'PadMapper', fn: (loc) => stubScraper('PadMapper') },
  { name: 'RentCafe', fn: (loc) => stubScraper('RentCafe') },
  { name: 'ForRent.com', fn: (loc) => stubScraper('ForRent.com') },
  { name: 'ApartmentGuide.com', fn: (loc) => stubScraper('ApartmentGuide.com') },
  { name: 'Oodle Rentals', fn: (loc) => stubScraper('Oodle Rentals') },
  { name: 'Facebook Marketplace', fn: (loc) => stubScraper('Facebook Marketplace') },
  { name: 'Sublet.com', fn: (loc) => stubScraper('Sublet.com') },
  { name: 'RentHop', fn: (loc) => stubScraper('RentHop') },
  { name: 'Lovely', fn: (loc) => stubScraper('Lovely') },
  { name: 'Walk Score Rentals', fn: (loc) => stubScraper('Walk Score Rentals') },
  { name: 'RentLingo', fn: (loc) => stubScraper('RentLingo') },
  { name: 'ApartmentHomeLiving.com', fn: (loc) => stubScraper('ApartmentHomeLiving.com') },
  { name: 'MyNewPlace', fn: (loc) => stubScraper('MyNewPlace') },
  { name: 'Point2Homes', fn: (loc) => stubScraper('Point2Homes') },
  { name: 'Rentberry', fn: (loc) => stubScraper('Rentberry') },
  { name: 'Nestpick', fn: (loc) => stubScraper('Nestpick') },
  { name: 'Roomster', fn: (loc) => stubScraper('Roomster') },
  { name: 'Roomi', fn: (loc) => stubScraper('Roomi') },
  { name: 'SpareRoom', fn: (loc) => stubScraper('SpareRoom') },
  { name: 'Rentometer', fn: (loc) => stubScraper('Rentometer') },
];

async function scrapeAllSites(location) {
  const results = await Promise.all(siteScrapers.map(async (site) => {
    try {
      const rentals = await site.fn(location);
      return rentals.map(r => ({ ...r, source: site.name }));
    } catch (e) {
      return [];
    }
  }));
  return results.flat();
}

module.exports = scrapeAllSites; 