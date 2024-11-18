const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeEventss() {
    const { data } = await axios.get('https://magic.gg/events');
    const $ = cheerio.load(data);

    const events = [];

    $('a.css-2XKNJ').each((index, element) => {
        const title = $(element).find('div.css-2K89L').text().trim();
        const date = $(element).find('span.css-_rnD-').text().trim();
        const location = $(element).find('span.css-3HKUG').text().trim();
        const url = $(element).attr('href'); // URL completa del evento

        events.push({
            title,
            date,
            location,
            url,
        });
    });

    return events;
}

module.exports = scrapeEventss;