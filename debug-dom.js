import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';

async function debugDOM() {
  console.log('Debugging DOM structure...');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Wait for React to render
    await page.waitForTimeout(3000);
    
    // Check if sections exist in DOM
    const sections = await page.evaluate(() => {
      const sectionIds = ['about', 'experience', 'projects', 'tech', 'contact'];
      const results = {};
      
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const styles = window.getComputedStyle(element);
          results[id] = {
            exists: true,
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            height: styles.height,
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            position: styles.position,
            zIndex: styles.zIndex,
            transform: styles.transform,
            innerHTML: element.innerHTML.substring(0, 200) + '...'
          };
        } else {
          results[id] = { exists: false };
        }
      });
      
      return results;
    });
    
    console.log('Section debug info:', JSON.stringify(sections, null, 2));
    
    // Check console errors
    const logs = [];
    page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
    
    // Check for any JavaScript errors
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    
    await page.waitForTimeout(1000);
    
    if (errors.length > 0) {
      console.log('JavaScript errors:', errors);
    }
    if (logs.length > 0) {
      console.log('Console logs:', logs);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
  
  await context.close();
  await browser.close();
}

debugDOM().catch(console.error);