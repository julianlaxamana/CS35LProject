const cron = require('node-cron');
const scrape = require('../scripts/menuScraper');

// Scrapes data from UCLA menu site everyday at 3am.
cron.schedule('0 3 * * *', () => {
    //scrape()
}, {
    timezone: 'America/Los_Angeles'
})