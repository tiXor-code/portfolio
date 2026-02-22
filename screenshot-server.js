#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

// Create HTTP server to serve dist/ folder
const server = http.createServer((req, res) => {
  // Handle /wip2/ base path
  let urlPath = req.url;
  if (urlPath.startsWith('/wip2/')) {
    urlPath = urlPath.substring(5); // Remove /wip2 prefix
  }
  
  let filePath = path.join(__dirname, 'dist', urlPath === '/' ? 'index.html' : urlPath);
  
  // Security check - ensure we're within dist directory
  if (!filePath.startsWith(path.join(__dirname, 'dist'))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('File not found');
    return;
  }

  // Get file extension and MIME type
  const ext = path.extname(filePath);
  const mimeType = mimeTypes[ext] || 'text/plain';

  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Internal server error');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

async function takeScreenshots() {
  console.log('Starting screenshot process...');
  
  // Ensure screenshots directory exists
  const screenshotsDir = '/home/ubuntu/clawd/portfolio/qa-screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 }
  ];

  const sections = [
    { name: 'hero', selector: '#hero' },
    { name: 'about', selector: '#about' },
    { name: 'experience', selector: '#experience' },
    { name: 'projects', selector: '#projects' },
    { name: 'tech', selector: '#tech' },
    { name: 'contact', selector: '#contact' },
    { name: 'fullpage', selector: null } // Full page screenshot
  ];

  for (const viewport of viewports) {
    console.log(`Taking screenshots for ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait a bit for animations to settle
      await page.waitForTimeout(2000);
      
      for (const section of sections) {
        try {
          if (section.selector) {
            // Wait for section to be visible
            await page.waitForSelector(section.selector, { timeout: 10000 });
            
            // Scroll to section
            await page.evaluate((selector) => {
              const element = document.querySelector(selector);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, section.selector);
            
            // Wait for scroll animation
            await page.waitForTimeout(1000);
            
            // Take screenshot of the section
            const element = await page.$(section.selector);
            if (element) {
              await element.screenshot({
                path: `${screenshotsDir}/v2-${section.name}-${viewport.name}.png`,
                type: 'png'
              });
              console.log(`✓ Screenshot saved: v2-${section.name}-${viewport.name}.png`);
            }
          } else {
            // Full page screenshot
            await page.screenshot({
              path: `${screenshotsDir}/v2-${section.name}-${viewport.name}.png`,
              type: 'png',
              fullPage: true
            });
            console.log(`✓ Screenshot saved: v2-${section.name}-${viewport.name}.png`);
          }
        } catch (err) {
          console.error(`Error taking screenshot for ${section.name} on ${viewport.name}:`, err.message);
        }
      }
    } catch (err) {
      console.error(`Error loading page on ${viewport.name}:`, err.message);
    }
    
    await context.close();
  }

  await browser.close();
  console.log('Screenshot process completed!');
}

// Start server and take screenshots
server.listen(PORT, async () => {
  console.log(`Server running at ${BASE_URL}`);
  
  try {
    await takeScreenshots();
  } catch (err) {
    console.error('Error during screenshot process:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});