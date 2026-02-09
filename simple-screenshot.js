import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const screenshotsDir = '/home/ubuntu/clawd/portfolio/qa-screenshots';

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

const sections = [
  'hero',
  'about', 
  'experience',
  'projects',
  'tech',
  'contact'
];

async function takeScreenshots() {
  console.log('Starting screenshot process...');
  
  const browser = await chromium.launch({ headless: true });
  
  for (const viewport of viewports) {
    console.log(`Taking screenshots for ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    try {
      // Navigate to the page
      await page.goto(BASE_URL, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
      });
      
      console.log(`✓ Page loaded for ${viewport.name}`);
      
      // Wait for React to render
      await page.waitForTimeout(3000);
      
      // Take full page screenshot first
      await page.screenshot({
        path: `${screenshotsDir}/v2-fullpage-${viewport.name}.png`,
        type: 'png',
        fullPage: true
      });
      console.log(`✓ Full page screenshot saved: v2-fullpage-${viewport.name}.png`);
      
      // Take screenshots of individual sections
      for (const section of sections) {
        try {
          // Try to scroll to and screenshot the section
          await page.evaluate((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return true;
            }
            return false;
          }, section);
          
          // Wait for scroll animation
          await page.waitForTimeout(1500);
          
          // Take screenshot of viewport (which should show the section)
          await page.screenshot({
            path: `${screenshotsDir}/v2-${section}-${viewport.name}.png`,
            type: 'png'
          });
          console.log(`✓ Section screenshot saved: v2-${section}-${viewport.name}.png`);
          
        } catch (err) {
          console.error(`Error taking screenshot for ${section} on ${viewport.name}:`, err.message);
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

takeScreenshots().catch(console.error);