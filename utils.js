const axios = require('axios');
const cheerio = require('cheerio');
const async = require('async');

// Helper function to fetch HTML content
async function fetchHtml(url) {
  const { data } = await axios.get(url);
  return data;
}

// Function to discover product URLs on a domain
async function discoverProductUrls(domain) {
  const urlPatterns = ['/product/', '/item/', '/p/'];
  const visited = new Set();
  const productUrls = new Set();
  const queue = [domain];

  while (queue.length > 0) {
    const currentUrl = queue.shift();
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    try {
      const html = await fetchHtml(currentUrl);
      const $ = cheerio.load(html);

      // Find all anchor tags and process links
      $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
          const fullUrl = new URL(href, domain).href;
          if (urlPatterns.some(pattern => fullUrl.includes(pattern))) {
            productUrls.add(fullUrl);
          } else if (fullUrl.startsWith(domain) && !visited.has(fullUrl)) {
            queue.push(fullUrl);
          }
        }
      });
    } catch (err) {
      console.error(`Error processing ${currentUrl}: ${err.message}`);
    }
  }

  return Array.from(productUrls);
}

module.exports = { discoverProductUrls };
