import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'http://localhost:3457/';
const SCREENSHOTS_DIR = './qa-screenshots/';

// Viewport configurations
const viewports = [
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 }
];

// Test results storage
const testResults = {
  screenshots: [],
  consoleErrors: [],
  layoutIssues: [],
  performanceMetrics: {},
  navigationTests: [],
  modalTests: [],
  accessibilityIssues: []
};

async function runVisualQA() {
  console.log('🚀 Starting Visual QA Tests (Remaining Viewports)...');
  
  const browser = await chromium.launch({ headless: true });
  
  for (const viewport of viewports) {
    console.log(`\n📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
    
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height }
    });
    
    const page = await context.newPage();
    
    // Listen for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`${viewport.name}: ${msg.text()}`);
      }
    });
    
    try {
      // Measure page load time
      const navigationStart = Date.now();
      await page.goto(SITE_URL, { waitUntil: 'networkidle' });
      
      // Wait for React app to render (look for content)
      await page.waitForSelector('#root > *', { timeout: 10000 });
      await page.waitForTimeout(2000);
      
      const navigationEnd = Date.now();
      const loadTime = navigationEnd - navigationStart;
      
      // Measure Largest Contentful Paint
      const lcp = await page.evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver(list => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry ? lastEntry.startTime : 0);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          setTimeout(() => resolve(0), 3000);
        });
      });
      
      testResults.performanceMetrics[viewport.name] = {
        loadTime: loadTime,
        lcp: lcp
      };
      
      console.log(`⚡ Load time: ${loadTime}ms, LCP: ${lcp.toFixed(2)}ms`);
      
      // Take full-page screenshot
      const fullPagePath = path.join(SCREENSHOTS_DIR, `full-page-${viewport.name}.png`);
      await page.screenshot({ 
        path: fullPagePath, 
        fullPage: true 
      });
      testResults.screenshots.push(fullPagePath);
      console.log(`📸 Full page screenshot: ${fullPagePath}`);
      
      // Check for horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      if (hasHorizontalScroll) {
        testResults.layoutIssues.push(`${viewport.name}: Horizontal scroll detected`);
        console.log(`⚠️ Layout issue: Horizontal scroll on ${viewport.name}`);
      }
      
      // Screenshot sections
      const sections = [
        { name: 'hero', selectors: ['[id*="hero" i]', '[class*="hero" i]'] },
        { name: 'about', selectors: ['[id*="about" i]', '[class*="about" i]'] },
        { name: 'projects', selectors: ['[id*="project" i]', '[class*="project" i]'] },
        { name: 'contact', selectors: ['[id*="contact" i]', '[class*="contact" i]'] }
      ];
      
      for (const section of sections) {
        let element = null;
        let usedSelector = '';
        
        for (const selector of section.selectors) {
          try {
            const candidate = await page.locator(selector).first();
            if (await candidate.count() > 0) {
              element = candidate;
              usedSelector = selector;
              break;
            }
          } catch (e) {
            // Continue
          }
        }
        
        try {
          if (element && await element.count() > 0) {
            const sectionPath = path.join(SCREENSHOTS_DIR, `${section.name}-${viewport.name}.png`);
            await element.screenshot({ path: sectionPath });
            testResults.screenshots.push(sectionPath);
            console.log(`📷 Section screenshot: ${sectionPath}`);
          } else {
            console.log(`⚠️ Section not found: ${section.name}`);
          }
        } catch (error) {
          console.log(`❌ Error screenshotting ${section.name}: ${error.message}`);
        }
      }
      
      // Add console errors
      if (consoleErrors.length > 0) {
        testResults.consoleErrors.push(...consoleErrors);
        console.log(`🔴 ${consoleErrors.length} console errors found`);
      } else {
        console.log(`✅ No console errors`);
      }
      
    } catch (error) {
      console.error(`❌ Error testing ${viewport.name}:`, error.message);
      testResults.layoutIssues.push(`${viewport.name}: Test error - ${error.message}`);
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('\n✅ Visual QA Tests Complete!');
  
  return testResults;
}

// Run the tests
runVisualQA().then(results => {
  console.log('\n📊 Additional screenshots captured for tablet and mobile viewports');
  console.log(`Screenshots: ${results.screenshots.join(', ')}`);
  console.log(`Performance: ${JSON.stringify(results.performanceMetrics, null, 2)}`);
}).catch(error => {
  console.error('❌ QA Tests failed:', error);
});