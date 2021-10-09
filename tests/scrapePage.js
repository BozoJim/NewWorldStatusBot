const scrape = require('../scripts/scrapePage')
scrape.collectData().then((result) => console.log(result))
