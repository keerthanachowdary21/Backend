const puppeteer = require('puppeteer');

async function crawlEcommerceWebsites(domains) {
  const browser = await puppeteer.launch({ headless: true });
  const results = {};

  for (const domain of domains) {
    console.log(`Crawling domain: ${domain}`);
    results[domain] = [];

    try {
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
      );

      await page.goto(`https://${domain}`, { waitUntil: 'networkidle2', timeout: 60000 });
      await handleInfiniteScroll(page);

      // Screenshot for debugging
      await page.screenshot({ path: `screenshot-${domain}.png` });

      // Extract and log raw URLs
      const urls = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a')).map((link) => link.href)
      );
      console.log(`Raw URLs from ${domain}:`, urls);

      // Filter and handle relative URLs
      const productUrls = urls
        .filter((url) => url.includes('/product') || url.includes('/item') || url.includes('/p'))
        .map((url) => new URL(url, `https://${domain}`).href);

      console.log(`Discovered ${productUrls.length} product URLs on ${domain}`);
      results[domain] = productUrls;

      await page.close();
    } catch (error) {
      console.error(`Error crawling domain: ${domain}`, error.message);
    }
  }

  await browser.close();
  console.log('Crawling Results:', results);
  return results;
}

async function handleInfiniteScroll(page) {
  let previousHeight;
  try {
    while (true) {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      const newHeight = await page.evaluate('document.body.scrollHeight');
      if (newHeight === previousHeight) break;
    }
  } catch (error) {
    console.error('Error in handleInfiniteScroll:', error.message);
  }
}

const domains = ['example1.com', 'example2.com', 'example3.com'];
crawlEcommerceWebsites(domains)
  .then((results) => {
    console.log('Final Crawling Results:', results);
  })
  .catch((error) => {
    console.error('Error during crawling:', error.message);
  });
