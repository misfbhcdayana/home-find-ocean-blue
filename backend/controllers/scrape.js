const scrapeAllSites = require('../scrapers/allSites');

exports.triggerScrape = async (req, res) => {
  const { location } = req.body;
  if (!location) return res.status(400).json({ error: 'Location required' });
  try {
    const rentals = await scrapeAllSites(location);
    res.json({ rentals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 