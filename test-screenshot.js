import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';

async function testScreenshot() {
  console.log('Taking test screenshot...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto(BASE_URL, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log('✓ Page loaded');
    
    // Wait for React to render
    await page.waitForTimeout(3000);
    
    // Take full page screenshot
    await page.screenshot({
      path: `/home/ubuntu/clawd/portfolio/qa-screenshots/test-fix-desktop.png`,
      type: 'png',
      fullPage: true
    });
    console.log('✓ Test screenshot saved');
    
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  await context.close();
  await browser.close();
}

testScreenshot().catch(console.error);