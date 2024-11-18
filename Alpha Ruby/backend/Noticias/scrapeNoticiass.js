const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNoticiass() {
    const meristationUrl = 'https://as.com/meristation/juegos/magic-the-gathering/noticias/';
    const ignUrl = 'https://es.ign.com/magic-the-gathering';

    const articles = [];

    // Scraping Meristation
    try {
        const { data: meristationData } = await axios.get(meristationUrl);
        const $ = cheerio.load(meristationData);

        $('article.s.s--h').each((index, element) => {
            const title = $(element).find('h2.s__tl a').text().trim();
            const link = $(element).find('h2.s__tl a').attr('href');
            const author = $(element).find('div.s__me__au a.s__au').text().trim();
            const date = $(element).find('time.s__date').attr('datetime');
            const imgUrl = $(element).find('img.mm__img').attr('src');

            articles.push({
                title,
                link, // Completar la URL
                author,
                date,
                imgUrl,
                source: 'Meristation'
            });
        });
    } catch (error) {
        console.error('Error scraping Meristation:', error.message);
    }

    // Scraping IGN
    try {
        const { data: ignData } = await axios.get(ignUrl);
        const $ = cheerio.load(ignData);

        $('article.article.NEWS').each((index, element) => {
            const title = $(element).find('h3 a span.caption').text().trim();
            const link = $(element).find('h3 a').attr('href');
            const imgUrl = $(element).find('img.thumb').attr('src'); // Tomamos la URL de la imagen desde el atributo src
            const date = $(element).find('time').attr('datetime');
            const description = $(element).find('p.deck').text().trim();

            articles.push({
                title,
                link,
                imgUrl,
                date,
                description,
                source: 'IGN'
            });
        });
    } catch (error) {
        console.error('Error scraping IGN:', error.message);
    }

    return articles;
}

module.exports = scrapeNoticiass;
