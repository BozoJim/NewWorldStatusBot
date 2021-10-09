const puppeteer = require("puppeteer");

module.exports = {
  collectData: async function collectData() {
    // const { chrome } = require('../config.json');
    const browser = await puppeteer.launch({
      // executablePath: chrome
    })
    const page = await browser.newPage();
    await page.goto("https://nwdb.info/server-status", {waitUntil: 'networkidle2'});

    await page.type("input.form-control.text-light.svelte-1sqyhcl.css", "Atvatabar");

    const headers = await page.evaluate(() => {
      const trs = Array.from(document.querySelectorAll('th'))
      return trs.map(td => td.innerText)
    });
    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('td'))
      return tds.map(td => td.innerText)
    });

    results = {}
    for (let index = 0; index < headers.length; index++) {
      results[headers[index]] = data[index]
    }

    await browser.close();
    
    return results
  }
}

// or get the json and grab this:
// console.log(dataDump['data']['servers'].filter((item) => item['worldName'] === 'Atvatabar')[0]['queueTime'])
