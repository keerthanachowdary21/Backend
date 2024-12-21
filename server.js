const { discoverProductUrls } = require('./utils');
const fs = require('fs');
const path = require('path');

// Input: List of domains
const domains = [
  'https://example1.com',
  'https://example2.com',
  'https://example3.com',
];

// Main function to handle crawling and output
async function main() {
  const results = {};
  for (const domain of domains) {
    try {
      console.log(`Crawling domain: ${domain}`);
      const productUrls = await discoverProductUrls(domain);
      results[domain] = productUrls;
    } catch (err) {
      console.error(`Error crawling ${domain}: ${err.message}`);
      results[domain] = [];
    }
  }

  // Output results to a JSON file
  const outputFilePath = path.join(__dirname, 'productUrls.json');
  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Results saved to ${outputFilePath}`);
}

main();
