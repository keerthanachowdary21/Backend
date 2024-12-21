# Crawler for Discovering Product URLs on E-commerce Websites

This project implements a web crawler designed to discover and list product URLs across multiple e-commerce domains. The crawler intelligently identifies product pages using predefined URL patterns and outputs a structured list of product URLs for each domain.

---

## Features

1. **URL Discovery**:
   - Identifies product pages by scanning URLs containing specific patterns like `/product/`, `/item/`, `/p/`.
   
2. **Scalability**:
   - Handles multiple domains, deep website hierarchies, and a large number of pages.

3. **Performance**:
   - Efficiently fetches and parses HTML using asynchronous operations.
   - Prevents redundant processing with a `Set` for visited URLs.

4. **Robustness**:
   - Handles edge cases such as infinite scrolling and dynamic content.
   - Provides error handling for broken or inaccessible links.

5. **Output**:
   - Generates a JSON file mapping each domain to its discovered product URLs.

---

## Requirements

Install the required dependencies:

```
npm install axios cheerio async

```
---

# Dependencies
1. **axios**: For making HTTP requests.
2. **cheerio**: For HTML parsing and DOM traversal.
3. **async**: For managing asynchronous operations.

# Output Format
The output is a JSON file (productUrls.json) mapping each domain to its discovered product URLs. Example:

json
```bash
{
  "https://example1.com": [
    "https://example1.com/product/12345",
    "https://example1.com/item/67890"
  ],
  "https://example2.com": [
    "https://example2.com/p/11111",
    "https://example2.com/product/22222"
  ]
}

## Assumptions and Approach
# URL Patterns:

- Product pages are identified by predefined patterns (/product/, /item/, /p/).
The patterns can be customized in the utils.js file.
Scalability:

- The solution is designed to handle multiple domains, even with large and complex websites.
Parallel processing of domains ensures that the crawler works efficiently.
Error Handling:

- The crawler skips problematic URLs and continues processing others without crashing.
Errors during fetching or parsing are logged.
